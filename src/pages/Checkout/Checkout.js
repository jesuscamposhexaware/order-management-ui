import React, { useState, useEffect } from 'react';
import { Container, Input, Label, FormGroup, FormText } from 'reactstrap';
import ProductTable from './components/ProductTable';

const Checkout = ({
    user,
    cart,
    setCart
}) => {
    const [order, setOrder] = useState({ user: user.idUser, orderDetails: cart });
    const [addresses, setAddresses] = useState([]);
    const [file, setfile] = useState(null);

    const onSelect = (e) => {
        console.log(order)
        setOrder({
            ...order,
            address: e.target.value
        })
    }

    const onFile= (e) => {
        console.log(order)
        setOrder({
            ...order,
            giftMessage: e.target.value
        })
    }

    useEffect(() => {
        setOrder({
            ...order,
            orderDetails: cart
        });// eslint-disable-next-line
    }, [cart]);

    return (
        <Container className="content">
            <h3>Your order</h3>
            <ProductTable cart={cart} setCart={setCart} />
            {cart.length === 0 ?
                <div className='text-center'>
                    <h6>You don't have any product in your cart, add some products to start shopping!</h6>
                </div> : null
            }
            {cart.length > 0 ?
                <Container>
                    <Input bsSize="lg" className="mb-3" type="select" onChange={onSelect}>
                        <option id={1} onSelect={onSelect}>
                            Large Select
                        </option>
                        <option id={2} onSelect={onSelect}>
                            Large Select
                        </option>
                    </Input>

                    <FormGroup>
                        <Label for="giftMessage">File</Label>
                        <Input id="giftMessage" name="file" type="file" onChange={onFile}/>
                        <FormText>
                            You can upload .doc and .jpg or .png files.
                        </FormText>
                    </FormGroup>
                </Container>
                : null}
        </Container>
    );
}

export default Checkout;
