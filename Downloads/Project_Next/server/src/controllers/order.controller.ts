import { Request, Response } from 'express';
import pool from "../config/database";
import { RowDataPacket } from 'mysql2';
/*-----------------------------------------

-------------------------------------------*/
interface OrderRow extends RowDataPacket {
    id: number;
    email: string;
    product_title: string;
    status: string;
}
/*-----------------------------------------
 Create order
  -------------------------------------------*/
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            fullName,
            email,
            phone,
            address,
            productId,
            productTitle,
            productPrice,
            quantity = 1,
            paymentMethod = "cod"
        } = req.body;

        /*-----------------------------------------
                Check db
        -------------------------------------------*/
        if (!fullName || !email || !phone || !address || !productId || !productTitle || !productPrice) {
            res.status(400).json({ error: "Thiếu thông tin đơn hàng" });
            return;
        }

        const totalAmount = productPrice * quantity;

        /*-----------------------------------------
        Xử lý thanh toán bằng ví
        -------------------------------------------*/
        if (paymentMethod === "wallet") {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                res.status(401).json({ error: "Cần đăng nhập để thanh toán bằng ví" });
                return;
            }

            const jwt = require('jsonwebtoken');
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const userId = decoded.userId;

            // Kiểm tra số dư ví
            const [wallets] = await pool.execute(
                'SELECT balance FROM wallets WHERE user_id = ?',
                [userId]
            );

            const wallet = (wallets as any[])[0];
            if (!wallet || wallet.balance < totalAmount) {
                res.status(400).json({ error: "Số dư ví không đủ để thanh toán" });
                return;
            }

            // Sử dụng connection cho transaction
            const connection = await pool.getConnection();
            
            try {
                await connection.beginTransaction();

                // Tạo đơn hàng với trạng thái đã thanh toán
                await connection.execute(
                    "INSERT INTO orders (full_name, email, phone, address, product_id, product_title, product_price, status, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?, 'confirmed', 'wallet')",
                    [fullName, email, phone, address, productId, productTitle, productPrice]
                );

                // Trừ tiền từ ví
                await connection.execute(
                    'UPDATE wallets SET balance = balance - ? WHERE user_id = ?',
                    [totalAmount, userId]
                );

                // Ghi lại lịch sử giao dịch (nếu có bảng này)
                try {
                    await connection.execute(
                        'INSERT INTO wallet_transactions (user_id, type, amount, description) VALUES (?, "payment", ?, ?)',
                        [userId, totalAmount, `Thanh toán đơn hàng: ${productTitle}`]
                    );
                } catch (err) {
                    // Bỏ qua nếu bảng wallet_transactions chưa tồn tại
                    console.log('Bảng wallet_transactions chưa tồn tại');
                }

                await connection.commit();
                res.status(200).json({
                    message: "Đặt hàng và thanh toán thành công",
                    paymentMethod: "wallet"
                });
            } catch (error) {
                await connection.rollback();
                throw error;
            } finally {
                connection.release();
            }
        } else {
            /*-----------------------------------------
            Thanh toán khi nhận hàng (COD)
            -------------------------------------------*/
            await pool.execute(
                "INSERT INTO orders (full_name, email, phone, address, product_id, product_title, product_price, status, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', 'cod')",
                [fullName, email, phone, address, productId, productTitle, productPrice]
            );

            res.status(200).json({
                message: "Đặt hàng thành công",
                paymentMethod: "cod"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi server" });
    }
};
/*-----------------------------------------
    Get all product
  -------------------------------------------*/
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const [orders] = await pool.execute<OrderRow[]>('SELECT * FROM orders ORDER BY created_at DESC');
        res.json(orders);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};
/*-----------------------------------------
  Update status product
  -------------------------------------------*/
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log('Yeu cau nhan:', {
            id,
            status,
            headers: req.headers,
            body: req.body
        });

        /*----------------------------------
        Check for valid status
        -----------------------------------*/
        const validStatuses = ['pending', 'confirmed', 'shipping', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            res.status(400).json({ error: 'Trạng thái không hợp lệ' });
            return;
        }

        /*----------------------------------
        
            Find order by id
        -----------------------------------*/
        const [orders] = await pool.execute<OrderRow[]>(
            'SELECT id, email, product_title FROM orders WHERE id = ?',
            [id]
        );

        if (!orders || orders.length === 0) {
            res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
            return;
        }

        const order = orders[0];

        /*----------------------------------
        Check for email
        -----------------------------------*/
        if (!order.email) {
            console.error('Email not found for order:', order);
            res.status(400).json({ error: 'Thiếu thông tin email trong đơn hàng' });
            return;
        }

        /*----------------------------------
        Update status
        -----------------------------------*/
        await pool.execute(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, id]
        );

        /*----------------------------------
        Create notifications
        -----------------------------------*/
        await pool.execute(
            'INSERT INTO notifications (user_email, title, message, is_read) VALUES (?, ?, ?, FALSE)',
            [
                order.email,
                `Cập nhật đơn hàng: ${order.product_title}`,
                `Đơn hàng của bạn đã được cập nhật sang trạng thái: ${status}`
            ]
        );

        res.json({
            success: true,
            message: 'Cập nhật trạng thái thành công',
            order: {
                ...order,
                status
            }
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
        res.status(500).json({
            error: 'Lỗi server',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.params;
        
        const [orders] = await pool.execute(
            'SELECT * FROM orders WHERE email = ? ORDER BY created_at DESC',
            [email]
        );
        
        res.status(200).json(orders);
    } catch (error) {
        console.error('Lỗi khi lấy đơn hàng của user:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};












