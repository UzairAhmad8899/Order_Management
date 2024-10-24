import db from '../config/db.js';
import bcrypt from 'bcrypt';

export const createUser = async (name, email, password, roleId) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword', hashedPassword)
    const query = `INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)`;
    const values = [name, email, hashedPassword, roleId];
    console.log('values', values)
    return await db.query(query, values);
};

export const findUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [user] = await db.query(query, [email]);
    return user[0];
};

export const listUsers = async () => {
    const query = `SELECT * FROM users`;
    const [users] = await db.query(query);
    return users;
};
