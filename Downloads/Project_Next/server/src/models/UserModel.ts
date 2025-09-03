import pool from '../config/database';
import { User } from '../interfaces/User';
import bcrypt from 'bcryptjs';

export default {
    async createUser(user: User): Promise<User> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const [result] = await pool.execute(
            'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)',
            [user.first_name, user.last_name, user.email, hashedPassword, user.role || 'user']
        );

        const insertId = (result as any).insertId;
        return { ...user, id: insertId };
    },

    async findByEmail(email: string): Promise<User | null> {
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        const users = rows as User[];
        return users.length > 0 ? users[0] : null;
    },


    async findById(id: number): Promise<User | null> {
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        const users = rows as User[];
        return users.length > 0 ? users[0] : null;
    },

    async updateProfile(userId: number, profileData: any): Promise<User | null> {
        const { first_name, last_name, email, phone, address, birth_date, gender, avatar } = profileData;

        // Convert birth_date to proper format for MySQL
        let formattedBirthDate = null;
        if (birth_date && birth_date.trim() !== '') {
            const date = new Date(birth_date);
            formattedBirthDate = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
        }

        await pool.execute(
            'UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, birth_date = ?, gender = ?, avatar = ? WHERE id = ?',
            [first_name, last_name, email, phone, address, formattedBirthDate, gender, avatar, userId]
        );

        return this.findById(userId);
    },

    async verifyPassword(userId: number, password: string): Promise<boolean> {
        const user = await this.findById(userId);
        if (!user) return false;

        return await bcrypt.compare(password, user.password);
    },

    async changePassword(userId: number, newPassword: string): Promise<boolean> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const [result] = await pool.execute(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, userId]
        );

        return (result as any).affectedRows > 0;
    }
};




