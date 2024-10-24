import { findOrCreateCustomer, getAllCustomers } from '../models/customer.js';

export const createCustomer = async (req, res) => {
    const { name, email } = req.body;

    try {
        const customerId = await findOrCreateCustomer(name, email);
        console.log('customer id ', customerId)
        res.status(201).json({ message: 'Customer processed successfully', customerId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to process customer.', error: error.message });
    }
};

export const listCustomers = async (req, res) => {
    try {
        const customers = await getAllCustomers();
        console.log('All customers', customers);
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve customers.', error: error.message });
    }
};
