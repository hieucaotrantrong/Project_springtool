import { Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket, OkPacket } from 'mysql2';

// Tạo mã nạp tiền unique
const generateTransferCode = (userId: number): string => {
    const timestamp = Date.now().toString().slice(-6);
    const userPart = userId.toString().padStart(3, '0');
    return `NAP${userPart}${timestamp}`;
};

// Tạo yêu cầu nạp tiền
export const createDepositRequest = async (req: Request, res: Response) => {
    try {
        const { amount, proofImage } = req.body;
        const userId = req.user?.userId;

        if (!userId || !amount || amount <= 0) {
            return res.status(400).json({ error: 'Thông tin không hợp lệ' });
        }

        const transferCode = generateTransferCode(parseInt(userId));

        await pool.execute(
            'INSERT INTO deposit_requests (user_id, amount, transfer_code, bank_account, proof_image) VALUES (?, ?, ?, ?, ?)',
            [userId, amount, transferCode, 'MB Bank - 0123456789 - NGUYEN VAN A', proofImage]
        );

        res.json({
            success: true,
            transferCode,
            bankInfo: {
                bank: 'MB Bank',
                accountNumber: '0123456789',
                accountName: 'NGUYEN VAN A',
                content: transferCode
            }
        });
    } catch (error) {
        console.error('Lỗi tạo yêu cầu nạp tiền:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// Lấy thông tin ví
export const getWalletInfo = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;

        // Tạo ví nếu chưa có
        await pool.execute(
            'INSERT IGNORE INTO wallets (user_id) VALUES (?)',
            [userId]
        );

        const [wallets] = await pool.execute(
            'SELECT * FROM wallets WHERE user_id = ?',
            [userId]
        ) as [RowDataPacket[], any];

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
};