import { Table } from 'antd';
import Column from 'antd/es/table/Column';
import React from 'react'
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
export const ListTourManagement = () => {
    return (
        <div>
            <Table
                dataSource={data}
                pagination={false}
            >
                <Column
                    title={"key"}
                    key={"key"}
                    dataIndex={"key"}
                />
                <Column
                    title={"name"}
                    key={"name"}
                    dataIndex={"name"}
                />
                <Column
                    title={"age"}
                    key={"age"}
                    dataIndex={"age"}
                />
                <Column
                    title={"address"}
                    key={"address"}
                    dataIndex={"address"}
                />
            </Table>;
        </div>
    )
}
