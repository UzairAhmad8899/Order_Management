import db from '../config/db.js';

export const createOrderHistory = async (orderId, status) => {
    const query = `INSERT INTO order_history (order_id, status, changed_at) VALUES (?, ?, NOW())`;
    return await db.query(query, [orderId, status]);
};
