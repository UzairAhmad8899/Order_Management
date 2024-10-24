import { createRole, getRoles, assignRoleToUser } from '../models/role.js';

export const addRole = async (req, res) => {
    const { name } = req.body;

    try {
        await createRole(name);
        res.status(201).json({ message: 'Role created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating role', error: error.message });
    }
};

export const listRoles = async (req, res) => {
    try {
        const roles = await getRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving roles', error: error.message });
    }
};

// Assign role to user
export const assignRole = async (req, res) => {
    const { userId, roleId } = req.body;

    try {
        await assignRoleToUser(userId, roleId);
        res.status(200).json({ message: 'Role assigned to user successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning role to user', error: error.message });
    }
};
