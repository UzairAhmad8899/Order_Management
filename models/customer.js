import db from '../config/db.js';

export const findOrCreateCustomer = async (name, email) => {
    try {
        const existingCustomerQuery = `SELECT * FROM customers WHERE email = ?`;
        const [existingCustomers] = await db.query(existingCustomerQuery, [email]);

        if (existingCustomers.length) {
            return existingCustomers[0].id;
        }

        const createCustomerQuery = `INSERT INTO customers (name, email) VALUES (?, ?)`;
        const [result] = await db.query(createCustomerQuery, [name, email]);
        return result.insertId;
    } catch (error) {
        console.error('Error in findOrCreateCustomer:', error);
        throw error;
    }
};

export const getAllCustomers = async () => {
    try {
        const query = `SELECT * FROM customers`;
        const [customers] = await db.query(query);
        console.log('get all customers', customers)
        return customers;
    } catch (error) {
        console.error('Error in getAllCustomers:', error);
        throw error;
    }
};
