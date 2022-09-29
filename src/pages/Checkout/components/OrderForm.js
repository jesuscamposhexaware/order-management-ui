import React from 'react';
import {
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Col,
    FormText,
    Button
} from 'reactstrap';

const OrderForm = ({
    order,
    onChange,
    onSubmit,
    onCancel,
    mode
}
) => {
    const isUpdate = mode === 'update';
    return (
        <Container>
            <Form>
                {isUpdate ?
                    <Label>
                        {"OR-" + order.idOrder}
                    </Label> : null
                }
                <h4>Delivery Address</h4>
                <FormGroup>
                    <Label for="receiverName">
                        Receiver Name
                    </Label>
                    <Input id="receiverName" name="receiver-name" placeholder="John Smith" onChange={onChange}
                        value={order.receiverName} />
                </FormGroup>
                <FormGroup>
                    <Label for="streetAddress">
                        Street Address
                    </Label>
                    <Input id="streetAddress" name="street-address" onChange={onChange} value={order.streetAddress} />
                </FormGroup>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="zipCode">
                                Zip Code
                            </Label>
                            <Input id="zipCode" name="zip-code" onChange={onChange} value={order.zipCode} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="city">
                                City
                            </Label>
                            <Input id="city" name="city" onChange={onChange} value={order.city} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="state">
                                State
                            </Label>
                            <Input id="state" name="state" onChange={onChange} value={order.state} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="country">
                                Country
                            </Label>
                            <Input id="country" name="country" onChange={onChange} value={order.country} />
                        </FormGroup>
                    </Col>
                </Row>
                <h4>Gift Message (Optional)</h4>
                <FormGroup>
                    <FormGroup>
                        <Label for="giftMessage">File</Label>
                        <Input id="giftMessage" name="gift-message" type="file" onChange={onChange} />
                        <a href={order.giftMessage}>{order.giftMessage}</a>
                        <FormText>
                            You can upload .doc and .jpg or .png files.
                        </FormText>
                    </FormGroup>
                </FormGroup>
                <Row>
                    <Col className="text-center">
                        <Button color='success' onClick={onSubmit}>Sumbit</Button>
                    </Col>
                    <Col className="text-center">
                        <Button color='danger' onClick={onCancel}>Cancel</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );

}

export default OrderForm;
