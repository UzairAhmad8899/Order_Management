import { createOrder, createOrders, listOrders, getOrderDetails, updateOrderStatus } from '../models/order.js';
import { findOrCreateCustomer } from '../models/customer.js';
import { createOrderHistory } from '../models/orderHistory.js';


export const createNewOrder = async (req, res) => {
    const { customerName, customerEmail, orders } = req.body;

    try {
        if (!orders) {
            return res.status(400).json({ message: 'Orders field is required.' });
        }

        const ordersArray = Array.isArray(orders) ? orders : [orders];

        if (ordersArray.length === 0) {
            return res.status(400).json({ message: 'At least one order is required.' });
        }

        const customerId = await findOrCreateCustomer(customerName, customerEmail);

        // if (ordersArray.length > 1) {

        // }

        // else {
        //     const order = await createOrder(customerId, ordersArray[0].status);
        //     await createOrderHistory(order.insertId, ordersArray[0].status);
        //     res.status(201).json({ message: 'Order created successfully.', orderId: order.insertId });
        // }
        const orderResults = await createOrders(customerId, ordersArray);
        const orderIds = orderResults.insertId; // Order results should give an array of IDs
        res.status(201).json({ message: 'Multiple orders created successfully.', orderIds });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order.', error: error.message });
    }
};

export const listAllOrders = async (req, res) => {
    const filter = req.query.filter || '';

    try {
        const orders = await listOrders(filter);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders.', error: error.message });
    }
};

export const orderDetails = async (req, res) => {

    const { orderId } = req.params;

    try {
        const order = await getOrderDetails(orderId);
        console.log('order', order)
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order details.', error: error.message });
    }
};

export const changeOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    console.log(' change status api gets called', orderId, status);


    try {
        await updateOrderStatus(orderId, status);
        await createOrderHistory(orderId, status);
        res.status(200).json({ message: 'Order status updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status.', error: error.message });
    }
};
