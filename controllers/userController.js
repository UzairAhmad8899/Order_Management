import { listUsers } from '../models/user.js';

export const listAllUsers = async (req, res) => {
    try {
        const users = await listUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users.', error: error.message });
    }
};
