import React, { useState } from 'react';
import ProductButton from '../../Store/components/ProductButton';

const ProductRow = ({
    data,
    handleChange
}) => {
    const [product, setProduct] = useState(data);

    const onAdd = () => {
        if(product.stock > product.quantity) {
            handleChange({
                ...product,
                quantity: product.quantity + 1,
                subtotal: (product.quantity + 1) * product.price
            });
            setProduct({
                ...product,
                quantity: product.quantity + 1
            });
        }
    }

    const onTakeAway = () => {
        if(product.quantity > 0) {
            handleChange({
                ...product,
                quantity: product.quantity - 1,
                subtotal: (product.quantity - 1) * product.price
            });
            setProduct({
                ...product,
                quantity: product.quantity - 1
            });
        }
    }

    return(<tr>
        <th scope="row">
            {"PR-"+product.idProduct}
        </th>
        <td>
            {product.name}
        </td>
        <td>
            {"$" + product.price}
        </td>
        <td>
            {product.quantity}
        </td>
        <td>
            {"$" + (product.price * product.quantity).toFixed(2)}
        </td>
        <td>
            <ProductButton product={product} onAdd={onAdd} onTakeAway={onTakeAway}/>
        </td>
    </tr>); 
}

export default ProductRow;