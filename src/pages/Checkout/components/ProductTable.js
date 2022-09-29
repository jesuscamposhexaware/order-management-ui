import React from 'react';
import { Table } from 'reactstrap';
import ProductRow from './ProductRow';

const ProductTable = ({
    cart,
    setCart,
    showMessage
}) => {

    const handleChange = (p) => {
        let exists = false;
        for (let i = 0; i < cart.length; i++) {
            if (p.idProduct === cart[i].idProduct) {
                if (p.quantity === 0) {
                    showMessage(cart[i].name + " removed from cart.", "danger");
                    cart.splice(i, 1);
                } else {
                    cart[i] = p;
                }
                exists = true;
            }
        }
        if (!exists) {
            showMessage(p.name + " added to the cart.", "info");
            cart.push(p);
        }
        setCart([...cart]);
    }


    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        Product Id
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Quantity
                    </th>
                    <th>
                        Subtotal
                    </th>
                    <th>
                        Modify
                    </th>
                </tr>
            </thead>
            <tbody>
                {cart.map((p) => (
                    <ProductRow key={"r-" + p.idProduct} data={p} handleChange={handleChange} />
                ))}
            </tbody>
        </Table>
    );
}

export default ProductTable;
