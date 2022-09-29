import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import ProductTable from './components/ProductTable';
import OrderForm from './components/OrderForm';
import OrderService from '../../services/OrderService';
import { useNavigate } from 'react-router-dom';

const Checkout = ({
    user,
    cart,
    setCart,
    showMessage
}) => {
    const [order, setOrder] = useState({ idUser: user.idUser, orderDetails: cart });
    const navigate = useNavigate();

    const onChange = ({ target }) => {
        let { id, value } = target;
        if(id === "giftMessage") {
            let type = value.split(".")[1]
            setOrder({
                ...order,
                [id]: value,
                giftMessageType: type
            });
        }
        setOrder({
            ...order,
            [id]: value
        });
    }

    const onSubmit = async () => {
        try {
            const { data } = OrderService.createOrder({
                ...order
            }, user.cred);
            console.log(data);
            setCart([]);
            showMessage("Order created correctly!", "success");
            navigate("/")
        } catch(e) {
            showMessage("Something went wrong, please try again", "danger");
        }
    }

    const onCancel = () => {
        navigate("/");
    }

    useEffect(() => {
        let total = 0;
        order.orderDetails.forEach(od => {
            total = total + (od.quantity * od.price)
        });
        setOrder({
            ...order,
            orderDetails: cart,
            total: total
        });// eslint-disable-next-line
    }, [cart]);

    useEffect(() => {
        console.log(order)
    }, [order])

    return (
        <Container className="content">
            <h3>Your order</h3>
            <ProductTable cart={cart} setCart={setCart} showMessage={showMessage}/>
            {cart.length === 0 ?
                <div className='text-center'>
                    <h6>You don't have any product in your cart, add some products to start shopping!</h6>
                </div> : null
            }
            {cart.length > 0 ?
                <OrderForm order={order} onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} mode='create'/>
                : null}
        </Container>
    );
}

export default Checkout;
