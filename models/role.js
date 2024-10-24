import db from '../config/db.js';

export const createRole = async (roleName) => {
    const query = `INSERT INTO roles (name) VALUES (?)`;
    const values = [roleName];
    return await db.query(query, values);
};


export const getRoles = async () => {
    const query = `SELECT * FROM roles`;
    const [roles] = await db.query(query);
    return roles;
};

export const assignRoleToUser = async (userId, roleId) => {
    const query = `UPDATE users SET role_id = ? WHERE id = ?`;
    return await db.query(query, [roleId, userId]);
};
