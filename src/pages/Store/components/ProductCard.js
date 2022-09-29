import React, { useState } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Badge
} from 'reactstrap';
import ProductButton from './ProductButton';


const ProductCard = ({
    data,
    cart,
    setCart,
    showMessage
}) => {
    const [product, setProduct] = useState({...data,
        quantity: 0
    });
    const available = data.stock > 0;
    const badgeColor = available ? 'success' : 'danger';
    const badgeText = available ? 'Available' : 'Sold out';

    const handleChange = (p) => {
        let exists = false;

        for (let i = 0; i < cart.length; i++) {
            if(p.idProduct === cart[i].idProduct) {
                if(p.quantity === 0) {
                    showMessage(cart[i].name + " removed from cart.", "danger");
                    cart.splice(i, 1);
                } else {
                    cart[i] = p;
                }
                exists = true;
            }
        }
        if(!exists) {
            showMessage(p.name + " added to the cart.", "info");
            cart.push(p);
        }
        setCart([...cart]);
    }

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
            })
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
                quantity: product.quantity - 1,
            })
        }
    }
    

    return (
        <Card className='product-card' body style={{ width: '18rem' }}>
            <img alt="Sample" src={product.picture}/>
            <CardBody>
                <CardTitle tag="h5">
                    {product.name}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    <Badge color={badgeColor}>
                        {badgeText}
                    </Badge>
                    {"  Price: $" + product.price}
                </CardSubtitle>
                <CardText>
                    {product.description}
                </CardText>
                <div className="text-center"><ProductButton product={product} onAdd={onAdd} onTakeAway={onTakeAway}/></div>   
            </CardBody>
        </Card>
    );
}

export default ProductCard;
