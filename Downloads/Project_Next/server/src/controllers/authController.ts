import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import { User } from '../interfaces/User';

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
            };
        }
    }
}

export default {
    /*-----------------------------------------
   Create Api Sigup
   -------------------------------------------*/
    async signup(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { name: first_name, lname: last_name, email, password, cpassword } = req.body;

            if (password !== cpassword) {
                res.status(400).json({ error: 'Mật khẩu không khớp' });
                return;
            }

            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                res.status(400).json({ error: 'Email đã được sử dụng' });
                return;
            }

            const newUser: User = {
                first_name,
                last_name,
                email,
                password
            };

            const createdUser = await UserModel.createUser(newUser);
            const { password: _, ...userWithoutPassword } = createdUser;

            res.status(201).json({
                message: 'Đăng ký thành công',
                user: userWithoutPassword
            });
        } catch (error) {
            console.error(error);
            next(error);
        }

    },
    /*-----------------------------------------
    Create Api Login
    -------------------------------------------*/
    async login(req: Request, res: Response, next: unknown) {
        try {
            const { email, password } = req.body;


            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(401).json({ error: 'Email không tồn tại' });
            }


            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Mật khẩu không đúng' });
            }


            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );


            const { password: _, ...userWithoutPassword } = user;
            res.json({
                message: 'Đăng nhập thành công',
                token,
                user: userWithoutPassword
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    },
    /*-----------------------------------------
    Update Profile API
    -------------------------------------------*/
    async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({ error: 'Không tìm thấy thông tin người dùng' });
                return;
            }

            const profileData = req.body;
            const updatedUser = await UserModel.updateProfile(Number(userId), profileData);

            if (!updatedUser) {
                res.status(404).json({ error: 'Người dùng không tồn tại' });
                return;
            }

            const { password: _, ...userWithoutPassword } = updatedUser;
            res.json({
                message: 'Cập nhật thông tin thành công',
                user: userWithoutPassword
            });
        } catch (error) {
            console.error('Lỗi cập nhật profile:', error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    },
    /*-----------------------------------------
    Change Password API
    -------------------------------------------*/
    async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({ error: 'Không tìm thấy thông tin người dùng' });
                return;
            }

            const { currentPassword, newPassword } = req.body;

            if (!currentPassword || !newPassword) {
                res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
                return;
            }

            // Verify current password
            const isValidPassword = await UserModel.verifyPassword(Number(userId), currentPassword);
            if (!isValidPassword) {
                res.status(400).json({ error: 'Mật khẩu hiện tại không đúng' });
                return;
            }

            // Update password
            const success = await UserModel.changePassword(Number(userId), newPassword);
            if (!success) {
                res.status(500).json({ error: 'Không thể đổi mật khẩu' });
                return;
            }

            res.json({ message: 'Đổi mật khẩu thành công' });
        } catch (error) {
            console.error('Lỗi đổi mật khẩu:', error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    },
    /*-----------------------------------------
    Get Profile API
    -------------------------------------------*/
    async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const user = await UserModel.findById(Number(userId));
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            const { password: _, ...userWithoutPassword } = user;
            res.json({ user: userWithoutPassword });
        } catch (error) {
            console.error('Lỗi get profile:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
};





