import React from 'react';
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

const App = () => {

    const [ user, setUser ] = useLocalStorage("user", null);
    const [ cart, setCart ] = useSessionStorage("cart", []);

    return(
        <Container>
            <Menu user={user} setUser={setUser} cart={cart} setCart={setCart}/>
            <Routes>
                <Route element={<ProtectedRoute isAllowed={!!user && user.role.includes("USER")} />}>
                    <Route exact path="/" element={<Store user={user} cart={cart} setCart={setCart}/>} />
                    <Route exact path="/orders" element={<Orders user={user} cart={cart} setCart={setCart}/>} />
                    <Route exact path="/checkout" element={<Checkout user={user} cart={cart} setCart={setCart}/>} />
                </Route>
                <Route element={<ProtectedRoute isAllowed={!!user && user.role.includes("ADMIN")} />}>
                    <Route exact path="/products" element={<Products />} />
                </Route>
                <Route exact path="/login" element={<Login setUser={setUser}/>} />
            </Routes>
        </Container>
    );
}

export default App;