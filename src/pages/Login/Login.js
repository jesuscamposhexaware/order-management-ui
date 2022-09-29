import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import UserService from '../../services/UserService';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Login = ({
    handleError,
    setUser,
    showMessage
}) => {

    const [userForm, setUserForm] = useState({});
    const [processing, setProcessing] = useState(false);
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
            showMessage("Welcome!", "primary");
            navigate("/");
        } catch (e) {
            showMessage("Invalid email or password.", "danger");
        } finally {
            setProcessing(false);
        }
    }

    return (
        <Container style={{ marginTop: "70px"}}>
            <Row>
                <Col className="mx-auto" xs="12" sm="12" md="8" lg="6" xl="6">
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
                </Col>
            </Row>
        </Container>
    );
}

Login.propTypes = {
    handleError: PropTypes.func,
    setUser: PropTypes.func
}

Login.defaultProps = {
    handleError: () => { },
    setUser: () => { }
}

export default Login;
