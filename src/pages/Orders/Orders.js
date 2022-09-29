import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import OrderTable from './components/OrderTable';
import OrderService from '../../services/OrderService';
import OrderModal from './components/OrderModal';

const Orders = ({
    user,
    showMessage
}) => {

    const [modal, setModal] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderToUpdate, setOrderToUpdate] = useState({ orderDetails: []});
    
    const tmp = async () => {
        const { data } = await OrderService.getOrdersByUser(user.idUser, user.cred);
        setOrders(data);
    } 

    const doUpdate = async (order) => {
        try {
            await OrderService.updateOrder(order, user.cred)
            showMessage("Order updated correctly!", "success");
            setModal(false);
            tmp();
        } catch(e) {
            showMessage("Something went wrong, please try again", "danger");
            console.log(e);
        }
    }

    const onUpdate = (o) => {
        setOrderToUpdate(o);
        setModal(true);
    }

    const onCancel = async (order) => {
        try {
            await OrderService.cancelOrder(order.idOrder, user.cred)
            showMessage("Order canceled correctly!", "success");
            tmp();
        } catch(e) {
            showMessage("Something went wrong, please try again", "danger");
            console.log(e);
        }
    }

    useEffect(() => {
        tmp();// eslint-disable-next-line
    }, [user])

    useEffect(() => {
        console.log(orderToUpdate)
    }, [orderToUpdate])

    return(
        <Container>
            <h3>Orders</h3>
            <OrderTable orders={orders} onUpdate={onUpdate} onCancel={onCancel}/>
            <OrderModal
            order={orderToUpdate}
            setOrder={setOrderToUpdate}
            modal={modal}
            setModal={setModal}
            onSubmit={doUpdate}
            showMessage={showMessage}/>
        </Container>
    );
}

export default Orders;
