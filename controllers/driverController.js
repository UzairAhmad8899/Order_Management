import { getAllDrivers, assignOrdersToDriver, getDriverOrders } from '../models/driver.js';

export const getDrivers = async (req, res) => {
    try {
        const drivers = await getAllDrivers();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching drivers', error: error.message });
    }
};

export const assignOrders = async (req, res) => {
    const { driverId, orderIds } = req.body;

    try {
        if (!orderIds || (Array.isArray(orderIds) && orderIds.length === 0)) {
            return res.status(400).json({ message: "No orders provided for assignment." });
        }

        const ordersToAssign = Array.isArray(orderIds) ? orderIds : [orderIds];

        await assignOrdersToDriver(driverId, ordersToAssign);
        res.status(200).json({ message: "Orders assigned to driver successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error assigning orders to driver.", error: error.message });
    }
};


export const getDriverAssignedOrders = async (req, res) => {
    const driverId = req.params.driverId;
    try {
        const orders = await getDriverOrders(driverId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching driver orders', error: error.message });
    }
};



// export const changeOrderStatus = async (req, res) => {
//     const { orderId } = req.params;
//     const { status } = req.body;
//     console.log('orderId, status', orderId, status);
//     try {
//         await updateOrderStatus(orderId, status);
//         await createOrderHistory(orderId, status);
//         res.status(200).json({ message: 'Order status updated successfully' });

//     } catch (error) {
//         res.status(500).json({ message: 'Error updating order status', error: error.message });
//     }
// };
