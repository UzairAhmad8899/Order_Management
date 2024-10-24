import db from '../config/db.js';

export const createOrders = async (customerId, orders) => {
    const query = `INSERT INTO orders (customer_id, status, created_at) VALUES ?`;
    const orderData = orders.map(order => [customerId, order.status, new Date()]);
    return await db.query(query, [orderData]);
};

export const createOrder = async (customerId, status) => {
    const query = `INSERT INTO orders (customer_id, status, created_at) VALUES (?, ?, NOW())`;
    return await db.query(query, [customerId, status]);
};

export const listOrders = async (filter) => {
    const query = `SELECT * FROM orders WHERE order_number LIKE ? OR created_at LIKE ? OR status LIKE ?`;
    const values = [`%${filter}%`, `%${filter}%`, `%${filter}%`];
    const [orders] = await db.query(query, values);
    return orders;
};

export const getOrderDetails = async (orderId) => {
    const query = `SELECT * FROM orders WHERE id = ?`;
    const [order] = await db.query(query, [orderId]);
    return order[0];
};

export const updateOrderStatus = async (orderId, status) => {
    const query = `UPDATE orders SET status = ? WHERE id = ?`;

    try {
        return await db.query(query, [status, orderId]);
    } catch (e) {
        console.log(e)
        return
    }
};
