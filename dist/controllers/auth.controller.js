"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/sql/User"));
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await User_1.default.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered', user: { id: user.id, username: user.username } });
    }
    catch (err) {
        res.status(400).json({ error: 'Registration failed', details: err });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ where: { email } });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ error: 'Invalid password' });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (err) {
        res.status(500).json({ error: 'Login error', details: err });
    }
};
exports.login = login;
const logout = (req, res) => {
    console.log("User logged out", req);
    res.status(200).json({ message: 'Logged out (token should be cleared client-side)' });
};
exports.logout = logout;
const getCurrentUser = async (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const user = await User_1.default.findByPk(userId, { attributes: ['id', 'username', 'email'] });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching user', details: err });
    }
};
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=auth.controller.js.map