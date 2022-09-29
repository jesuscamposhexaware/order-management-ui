import React from 'react';
import { Table } from 'reactstrap';
import OrderRow from './OrderRow';


const OrderTable = ({
    orders,
    onUpdate,
    onCancel
}) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        Order ID
                    </th>
                    <th>
                        Date
                    </th>
                    <th>
                        Updated
                    </th>
                    <th>
                        Total
                    </th>
                    <th>
                        Gift Message
                    </th>
                    <th>
                        Modify
                    </th>
                    <th>
                        Cancel
                    </th>
                </tr>
            </thead>
            <tbody>
                {orders.map((o, index) => (
                    <OrderRow key={"or-" + index} order={o} onUpdate={onUpdate} onCancel={onCancel} />
                ))}
            </tbody>
        </Table>
    );
}

export default OrderTable;
