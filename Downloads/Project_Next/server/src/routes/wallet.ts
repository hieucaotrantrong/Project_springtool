import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { auth } from '../types/auth';
import { RowDataPacket, OkPacket } from 'mysql2';

const router = Router();

// Lấy thông tin ví
router.get('/info', auth, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;

        const [rows] = await pool.execute(
            'SELECT * FROM wallets WHERE user_id = ?',
            [userId]
        ) as [RowDataPacket[], any];

        if (rows.length === 0) {
            // Tạo ví mới nếu chưa có
            await pool.execute(
                'INSERT INTO wallets (user_id, balance) VALUES (?, 0)',
                [userId]
            );
            res.json({ wallet: { balance: 0 } });
        } else {
            res.json({ wallet: rows[0] });
        }
    } catch (error) {
        console.error('Lỗi lấy thông tin ví:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Tạo yêu cầu nạp tiền
router.post('/deposit', auth, async (req: Request, res: Response): Promise<void> => {
    try {
        const { amount } = req.body;
        const userId = req.user?.userId;

        if (!amount || amount <= 0) {
            res.status(400).json({ error: 'Số tiền không hợp lệ' });
            return;
        }

        const transferCode = `NAP${userId}${Date.now()}`;

        await pool.execute(
            'INSERT INTO deposit_requests (user_id, amount, transfer_code, bank_account, status) VALUES (?, ?, ?, ?, "pending")',
            [userId, amount, transferCode, 'Vietcombank - 1021966858 - CAO TRẦN TRỌNG HIẾU']
        );

        res.json({
            success: true,
            transferCode,
            bankInfo: {
                bank: 'Vietcombank',
                accountNumber: '1021966858',
                accountName: 'CAO TRẦN TRỌNG HIẾU'
            }
        });
    } catch (error) {
        console.error('Lỗi tạo yêu cầu nạp tiền:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Thêm route GET /api/wallet để lấy thông tin ví
router.get('/', auth, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;

        // Tạo ví nếu chưa có
        await pool.execute(
            'INSERT IGNORE INTO wallets (user_id, balance) VALUES (?, 0)',
            [userId]
        );

        // Lấy thông tin ví
        const [wallets] = await pool.execute(
            'SELECT * FROM wallets WHERE user_id = ?',
            [userId]
        ) as [RowDataPacket[], any];

        // Lấy lịch sử nạp tiền
        const [deposits] = await pool.execute(
            'SELECT * FROM deposit_requests WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        ) as [RowDataPacket[], any];

        res.json({
            wallet: wallets[0],
            depositHistory: deposits
        });
    } catch (error) {
        console.error('Lỗi lấy thông tin ví:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

export default router;




