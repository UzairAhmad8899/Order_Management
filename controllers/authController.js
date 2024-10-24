import { createUser, findUserByEmail } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    const { name, email, password, role_id } = req.body;

    try {
        // const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(name, email, password, role_id);
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user.', error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        // console.log('User', user);
        // console.log(user.password, password);
        // console.log(await
        //     bcrypt.hash(password, 10));

        const passMatch = await bcrypt.compare(password, user.password)
        if (!user || !passMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role_id: user.role_id } });
    }

    catch (error) {
        res.status(500).json({ message: 'Error logging in.', error: error.message });
    }
};
