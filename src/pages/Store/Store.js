import React, { useEffect, useState } from 'react';
import { Container, Row, Input } from 'reactstrap';
import ProductCard from './components/ProductCard';
import ProductService from '../../services/ProductService';


const Store = ({ 
    user,
    cart,
    setCart,
    showMessage
}) => {
    const [showList, setShowList] = useState(null);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState("");
 
    const onChange = ({ target }) => {
        let { value } = target;
        setFilter(value);
    }

    useEffect(() => {
        async function fetchData() {
            const { data } = await ProductService.getProducts(user.cred);
            setProducts(data);    
        }
        fetchData();
    },[user.cred])

    useEffect(() => {
        let cards = filter ? products.filter(p => p.name.includes(filter)) : products;
        setShowList(cards.map(p => (
            <ProductCard key={p.idProduct} data={p} cart={cart} setCart={setCart} showMessage={showMessage}/>
        )));// eslint-disable-next-line
    }, [products, filter])

    return(
        <Container className='content'>
            <Row className='search-bar'>
                <Input onChange={onChange} placeholder="search"/>
            </Row>
            <Row>
                {showList}
            </Row>
        </Container>
    );
}

export default Store;
