import express from 'express';
import pool from '../config/database';

const router = express.Router();

/*----------------------------------
-----------------------------------*/
router.get('/:email', async (req, res) => {
    try {
        const [notifications] = await pool.execute(
            'SELECT * FROM notifications WHERE user_email = ? ORDER BY created_at DESC LIMIT 50',
            [req.params.email]
        );
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi server' });
    }
});
/*----------------------------------
-----------------------------------*/
router.put('/:id/read', async (req, res) => {
    try {
        await pool.execute(
            'UPDATE notifications SET `read` = TRUE WHERE id = ?',
            [req.params.id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi server' });
    }
});

export default router;