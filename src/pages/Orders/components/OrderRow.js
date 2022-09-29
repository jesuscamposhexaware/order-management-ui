import React from 'react';
import { Button } from 'reactstrap';

const OrderRow = ({
    order,
    onUpdate,
    onCancel
}) => {

    return(<tr>
        <th scope="row">
            {"OR-"+order.idOrder}
        </th>
        <td>
            {order.createdAt}
        </td>
        <td>
            {!!order.updatedAt ? order.updatedAt : "NA"}
        </td>
        <td>
            {order.total}
        </td>
        <td>
            {!!order.giftMessage ? "Yes" : "No"}
        </td>
        <td>
            <Button onClick={() => onUpdate(order)} color="primary">Modify</Button>
        </td>
        <td>
            <Button onClick={() => onCancel(order)} color="danger">Cancel</Button>
        </td>
    </tr>); 
}

export default OrderRow;