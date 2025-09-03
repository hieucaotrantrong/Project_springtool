import { Request, Response } from 'express';
import pool from '../config/database';

/*----------------------------------
Get all product
-----------------------------------*/
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi lấy sản phẩm' });
    }
};

/*----------------------------------
Get all product by id
-----------------------------------*/
export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);

        if ((rows as any[]).length > 0) {
            res.json((rows as any[])[0]);
        } else {
            res.status(404).json({ error: 'Sản phẩm không tồn tại' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi lấy sản phẩm' });
    }
};
/*----------------------------------
Create Product
-----------------------------------*/
export const createProduct = async (req: Request, res: Response) => {
    const { title, originalPrice, price, discount, tag, image, category } = req.body;

    console.log('Received data:', req.body);

    try {
        const [result] = await pool.query(
            'INSERT INTO products (title, originalPrice, price, discount, tag, image, category) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, originalPrice, price, discount, tag, image, category]
        );

        res.status(201).json({
            id: (result as any).insertId,
            title,
            originalPrice,
            price,
            discount,
            tag,
            image,
            category
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Lỗi khi thêm sản phẩm' });
    }
};


/*----------------------------------
Update prodcut
-----------------------------------*/
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, originalPrice, price, discount, tag, image, category } = req.body;

    console.log('Update product ID:', id);
    console.log('Update data:', req.body);

    try {
        const [result] = await pool.query(
            'UPDATE products SET title = ?, originalPrice = ?, price = ?, discount = ?, tag = ?, image = ?, category = ? WHERE id = ?',
            [title, originalPrice, price, discount, tag, image, category, id]
        );

        console.log('Update result:', result);

        if ((result as any).affectedRows > 0) {
            res.json({ message: 'Cập nhật sản phẩm thành công' });
        } else {
            res.status(404).json({ error: 'Sản phẩm không tồn tại' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm' });
    }
};

/*----------------------------------
Delete Product
-----------------------------------*/
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);

        if ((result as any).affectedRows > 0) {
            res.json({ message: 'Xóa sản phẩm thành công' });
        } else {
            res.status(404).json({ error: 'Sản phẩm không tồn tại' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Lỗi khi xóa sản phẩm' });
    }
};

