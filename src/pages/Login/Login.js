import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import UserService from '../../services/UserService';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Login = ({
    handleError,
    setUser
}) => {

    const [ userForm, setUserForm ] = useState({});
    const [ processing, setProcessing ] = useState(false);
    const navigate = useNavigate();

    const onChange = ({ target }) => {
        let { id, value } = target;
        setUserForm({
            ...userForm,
            [id]: value
        });
    }

    const onValidSubmit = async () => {
        try {
            setProcessing(true);
            const cred = userForm.email + ":" + userForm.password;
            const encodedCred = btoa(cred);
            const { data } = await UserService.getUserByEmail(userForm.email, encodedCred);
            setUser({
                cred: encodedCred,
                ...data
            })
            navigate("/");
        } catch (e) {
            handleError(e);
            console.log(e)
        } finally {
            setProcessing(false);
        }
    }

    return (
        <Container>
            
            <Form>
                <h3>Login</h3>
                <FormGroup>
                    <Label for="User's email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="user@example.com" required onChange={onChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="Password of the account">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="***********" required onChange={onChange} />
                </FormGroup>
                <div className="text-center">
                    <Button size="lg" color="info" onClick={onValidSubmit} disabled={processing}>Submit</Button>
                </div>
            </Form>
        </Container>
    );
}

Login.propTypes = {
    handleError: PropTypes.func,
    setUser: PropTypes.func
}

Login.defaultProps = {
    handleError: () => { },
    setUser: () => {}
}

export default Login;
