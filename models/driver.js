import db from '../config/db.js';

export const getAllDrivers = async () => {
    const query = `SELECT * FROM users WHERE role_id = 2`;
    return await db.query(query);
};

export const assignOrdersToDriver = async (driverId, orderIds) => {
    const query = `UPDATE orders SET driver_id = ? WHERE id IN (?)`;
    return await db.query(query, [driverId, orderIds]);
};


export const getDriverOrders = async (driverId) => {
    const query = `SELECT * FROM orders WHERE driver_id = ?`;
    return await db.query(query, [driverId]);
};


// ------------------------------------------------------------------


// export const updateOrderStatus = async (orderId, status) => {
//     const query = `UPDATE orders SET status = ? WHERE id = ?`;
//     return await db.query(query, [orderId, status]);
// };
