import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Products from './pages/Products';
import ProtectedRoute from './components/ProtectedRoute';
import Store from './pages/Store';
import useLocalStorage from './utils/useLocalStorage';
import useSessionStorage from './utils/useSessionStorage';
import Menu from './components/Menu';
import Container from './components/Container';
import { Alert } from 'reactstrap';

const App = () => {

    const [user, setUser] = useLocalStorage("user", null);
    const [cart, setCart] = useSessionStorage("cart", []);
    const [alert, setAlert] = useState({
        text: "this is an alert",
        color: "primary",
        visible: false
    })

    const showMessage = (text, color) => {
        setAlert({
            text: text,
            color: color,
            visible: true
        });
    }

    const dismissAlert = () => {
        setAlert({
            ...alert,
            visible: false
        })
    }

    return (
        <Container>
            <Menu user={user} setUser={setUser} cart={cart} setCart={setCart} />
            <Alert color={alert.color} isOpen={alert.visible} toggle={dismissAlert}>
                {alert.text}
            </Alert>
            <Routes>
                <Route element={<ProtectedRoute isAllowed={!!user && user.role.includes("USER")} showMessage={showMessage}/>}>
                    <Route exact path="/" element={<Store user={user} cart={cart} setCart={setCart} showMessage={showMessage}/>} />
                    <Route exact path="/orders" element={<Orders user={user} cart={cart} setCart={setCart} showMessage={showMessage}/>} />
                    <Route exact path="/checkout" element={<Checkout user={user} cart={cart} setCart={setCart} showMessage={showMessage}/>} />
                </Route>
                <Route element={<ProtectedRoute isAllowed={!!user && user.role.includes("ADMIN")} showMessage={showMessage}/>}>
                    <Route exact path="/products" element={<Products />} />
                </Route>
                <Route exact path="/login" element={<Login setUser={setUser} showMessage={showMessage}/>} />
            </Routes>
        </Container>
    );
}

export default App;