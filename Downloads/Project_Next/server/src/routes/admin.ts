import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { adminAuth } from '../middleware/adminAuth';
import { RowDataPacket } from 'mysql2';

const router = Router();

// Lấy danh sách yêu cầu nạp tiền
router.get('/deposits', adminAuth, async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute(`
            SELECT dr.*, u.email as user_email 
            FROM deposit_requests dr 
            JOIN users u ON dr.user_id = u.id 
            ORDER BY dr.created_at DESC
        `) as [RowDataPacket[], any];

        res.json(rows);
    } catch (error) {
        console.error('Lỗi lấy danh sách nạp tiền:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Duyệt yêu cầu nạp tiền
router.put('/deposits/:id/approve', adminAuth, async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Lấy thông tin deposit request
        const [deposits] = await pool.execute(
            'SELECT * FROM deposit_requests WHERE id = ? AND status = "pending"',
            [id]
        ) as [RowDataPacket[], any];

        if (deposits.length === 0) {
            res.status(404).json({ error: 'Không tìm thấy yêu cầu hoặc đã được xử lý' });
            return;
        }

        const deposit = deposits[0];

        // Bắt đầu transaction
        await pool.execute('START TRANSACTION');

        try {
            // Cập nhật trạng thái deposit
            await pool.execute(
                'UPDATE deposit_requests SET status = "approved" WHERE id = ?',
                [id]
            );

            // Tạo ví nếu chưa có
            await pool.execute(
                'INSERT IGNORE INTO wallets (user_id, balance) VALUES (?, 0)',
                [deposit.user_id]
            );

            // Cập nhật số dư ví
            await pool.execute(
                'UPDATE wallets SET balance = balance + ? WHERE user_id = ?',
                [deposit.amount, deposit.user_id]
            );

            // Commit transaction
            await pool.execute('COMMIT');

            console.log(`Đã duyệt nạp tiền: User ${deposit.user_id}, Amount: ${deposit.amount}`);
            res.json({ success: true });
        } catch (error) {
            // Rollback nếu có lỗi
            await pool.execute('ROLLBACK');
            throw error;
        }
    } catch (error) {
        console.error('Lỗi duyệt yêu cầu:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Từ chối yêu cầu nạp tiền
router.put('/deposits/:id/reject', adminAuth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await pool.execute(
            'UPDATE deposit_requests SET status = "rejected" WHERE id = ?',
            [id]
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Lỗi từ chối yêu cầu:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

export default router;


