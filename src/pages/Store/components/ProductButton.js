import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const ProductButton = ({
    product,
    onAdd,
    onTakeAway
}) => {
    const [left, setLeft] = useState({
        text: "-",
        enable: product.quantity > 0,
        color: product.quantity === 1 ? 'danger' : 'secondary'  
    })
    const [right, setRight] = useState(product.quantity < product.stock);

    useEffect(() => {
        const text = product.quantity === 1 ? <i className="fa-solid fa-trash-can"></i> : "-";
        const enable = product.quantity > 1;
        const color = product.quantity === 1 ? 'danger' : 'secondary';
        setLeft({ text, enable, color })
        setRight(product.quantity < product.stock)
    }, [product])

    return (
        <ButtonGroup size="lg">
            <Button color={left.color} active={left.enable} onClick={onTakeAway}>
                {left.text}
            </Button>
            <Button style={{ backgroundColor: 'white', color: 'black'}} color="secondary" active={false}>
                {product.quantity}
            </Button>
            <Button color="secondary" active={right} onClick={onAdd}>
                {"+"}
            </Button>
        </ButtonGroup>
    );
}

export default ProductButton;
