import { Button, Col, Dropdown, Input, Menu, Row, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react';
import "../../assets/css/components/tour/list.css"
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { DebounceInput } from '../../infrastucture/utils/helper';
import api from '../../infrastucture/api';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import Constants from '../../core/common/constant';
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout';

let timeout
export const ListTourManagement = () => {
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const onGetTourAsync = async ({ keyWord = "" }) => {
        const response = await api.getAllTour(
            `search=${keyWord}`,
            setLoading
        )
        if (response.data.tours?.length > 0) {
            setData(response.data.tours)
        }
    }
    const onSearch = async (keyWord = "") => {
        await onGetTourAsync({ keyWord: keyWord })
    };

    useEffect(() => {
        onSearch().then(_ => { })
    }, [])

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value,).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    const listAction = () => {
        return (
            <Menu>
                <Menu.Item>
                    Sửa
                </Menu.Item>
                <Menu.Item>
                    Xóa
                </Menu.Item>
            </Menu>
        )
    };
    return (
        <div>
            <MainLayout breadcrumb="Trang chủ" title="Quản lý Tour">
                <div className='tour-pg'>
                    <Row className='mb-3' justify={"space-between"} align={"middle"}>
                        <Col className='title'>Danh sách sản phẩm</Col>
                        <Col>
                            <Button className={"btn-add"} type='text' icon={<PlusOutlined />}>Thêm mới</Button>
                        </Col>
                    </Row>
                    <Row className='mb-4' justify={"start"}>
                        <Col>
                            <Input placeholder='Tìm kiếm theo tên...' value={searchText} onChange={onChangeSearchText} />
                        </Col>
                    </Row>
                    <Table
                        dataSource={data}
                        pagination={false}
                    >
                        <Column
                            title={"Tên Tour"}
                            key={"tenTour"}
                            dataIndex={"tenTour"}
                        />
                        <Column
                            title={"Chi phí"}
                            key={"chiPhi"}
                            dataIndex={"chiPhi"}
                        />
                        <Column
                            title={"Ngày bắt đầu"}
                            key={"ngayBatDau"}
                            dataIndex={"ngayBatDau"}
                        />
                        <Column
                            title={"Ngày kết thúc"}
                            key={"ngayKetThuc"}
                            dataIndex={"ngayKetThuc"}
                        />
                        <Column
                            title={"Số địa điểm"}
                            key={"soDiaDiem"}
                            dataIndex={"soDiaDiem"}
                        />

                        <Column
                            title={"Trạng thái"}
                            key={"status"}
                            dataIndex={"status"}
                        />
                        <Column
                            title={"Số ngày"}
                            key={"soNgay"}
                            dataIndex={"soNgay"}
                        />
                        <Column
                            title={"Lượt xem"}
                            key={"luotXem"}
                            dataIndex={"luotXem"}
                        />
                        <Column
                            title={"Action"}
                            width={"60px"}
                            fixed="right"
                            align='center'
                            render={(action, record) => (
                                // <CommonPermission permission={Permissions.OrderManagement.Order.action}>
                                <Space
                                    size="small"
                                >
                                    <Dropdown
                                        trigger={["hover"]}
                                        placement="bottomRight"
                                        overlay={listAction(record)}
                                    >
                                        <MenuOutlined className="pointer" />
                                    </Dropdown>
                                </Space>
                                // </CommonPermission>
                            )}
                        />
                    </Table>;
                    <FullPageLoading isLoading={loading} />
                </div>
            </MainLayout>
        </div>

    )
}
