import db from '../config/db.js';

export const createPermission = async (name) => {
    const query = `INSERT INTO permissions (name) VALUES (?)`;
    const values = [name];
    return await db.query(query, values);
};

export const getAllPermissions = async () => {
    const query = `SELECT * FROM permissions`;
    const [permissions] = await db.query(query);
    return permissions;
};
