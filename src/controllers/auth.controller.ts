import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/sql/User';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered', user: { id: user.id, username: user.username } });
    } catch (err) {
        res.status(400).json({ error: 'Registration failed', details: err });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Login error', details: err });
    }
};

export const logout = (req: Request, res: Response) => {
    console.log("User logged out", req); 
    res.status(200).json({ message: 'Logged out (token should be cleared client-side)' });
};

export const getCurrentUser = async (req: any, res: Response) => {
    const userId = req.user?.userId;
    try {
        const user = await User.findByPk(userId, { attributes: ['id', 'username', 'email'] });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user', details: err });
    }
};
