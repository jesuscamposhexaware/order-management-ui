import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import OrderForm from '../../Checkout/components/OrderForm';
import ProductTable from '../../Checkout/components/ProductTable';

const OrderModal = ({
    order,
    setOrder,
    onSubmit,
    modal,
    setModal,
    showMessage
}) => {

    const onChange = ({ target }) => {
        let { id, value } = target;
        setOrder({
            ...order,
            [id]: value
        });
    }

    const setCart = (c) => {
        let total = 0;
        c.forEach(od => {
            total = total + (od.quantity * od.price)
        });
        setOrder({...order,
            orderDetails: c,
            total: total});
    };
    

    return(
        <Modal size="xl" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Update Order</ModalHeader>
        <ModalBody>
            <OrderForm
                mode="update"
                order={order}
                onChange={onChange}
                onSubmit={() => onSubmit(order)}
                onCancel={() => setModal(false)} />
        </ModalBody>
        <ProductTable cart={order.orderDetails} setCart={setCart} showMessage={showMessage}/>
    </Modal>
    );
}

export default OrderModal;