import { createPermission } from '../models/permission.js';

// Create a new permission
export const addPermission = async (req, res) => {
    const { name } = req.body;

    try {
        await createPermission(name);
        res.status(201).json({ message: 'Permission created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating permission', error: error.message });
    }
};
