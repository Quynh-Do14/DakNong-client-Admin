import { Button, Col, Dropdown, Input, Menu, Row, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react';
import "../../assets/css/components/tour/list.css"
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { DebounceInput, convertDateOnly } from '../../infrastucture/utils/helper';
import api from '../../infrastucture/api';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import Constants from '../../core/common/constant';
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout';
import { ROUTE_PATH } from '../../core/common/appRouter';
import DialogConfirmCommon from '../../infrastucture/common/components/modal/dialogConfirm';
import { useNavigate } from 'react-router-dom';
import { PaginationCommon } from '../../infrastucture/common/components/controls/pagination';

let timeout
export const ListTourManagement = () => {
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(Constants.PaginationConfigs.Size);
    const [page, setPage] = useState(1);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [idSelected, setIdSelected] = useState(null);
    const [pagination, setPagination] = useState({});
    const navigate = useNavigate();

    const onGetListTourAsync = async ({ keyWord = "", limit = pageSize, page = 1 }) => {
        const response = await api.getAllTour(`${Constants.Params.searchName}=${keyWord}&${Constants.Params.limit}=${limit}&${Constants.Params.page}= ${page}`,
            setLoading
        )
        if (response.data.tours?.length > 0) {
            setData(response.data.tours)
        }
        setPagination(response.data.pagination);
    }
    const onSearch = async (keyWord = "", limit = pageSize, page = 1) => {
        await onGetListTourAsync({ keyWord: keyWord, limit: limit, page: page })
    };

    useEffect(() => {
        onSearch().then(_ => { })
    }, [])

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, page).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };
    const onFirstPage = () => {
        setPage(1)
        onSearch(searchText, pageSize, 1).then((_) => { });
    }
    const onPreviousPage = () => {
        setPage(prev => prev - 1);
        onSearch(searchText, pageSize, page - 1).then((_) => { });
    };

    const onNextPage = () => {
        setPage(prev => prev + 1);
        onSearch(searchText, pageSize, page + 1).then((_) => { });
    };

    const onLastPage = () => {
        let lastPage = pagination.total / pagination.limit;
        onSearch(searchText, pageSize, lastPage).then((_) => { });
    }

    let isLastPage = pagination.limit * pagination.page <= pagination.total ? false : true

    const onPageSizeChanged = (value) => {
        setPageSize(value);
        setSearchText("");
        setPage(1);
        onSearch(searchText, value, page).then((_) => { });
    };

    const onOpenModalDelete = (id) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    }

    const onDeleteTour = async () => {
        await api.deleteTour({
            id: idSelected
        },
            onSearch,
            setLoading
        )
        setIsDeleteModal(false);
    };

    const onNavigate = (id) => {
        navigate(`${(ROUTE_PATH.VIEW_TOUR).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }

    const listAction = (record) => {
        return (
            <Menu>
                <Menu.Item className='title-action' onClick={() => onNavigate(record.idTour)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Sửa</div>
                </Menu.Item>
                <Menu.Item className='title-action' onClick={() => onOpenModalDelete(record.idTour)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Xóa</div>
                </Menu.Item>
            </Menu>
        )
    };
    return (
        <div>
            <MainLayout breadcrumb="Trang chủ" title="Quản lý Tour">
                <div className='tour-pg'>
                    <Row className='mb-3' justify={"space-between"} align={"middle"}>
                        <Col className='title'>Danh sách Tour</Col>
                    </Row>
                    <Row className='mb-4' justify={"space-between"} align={"middle"}>
                        <Col xs={14} sm={14} lg={12}>
                            <Row align={"middle"}>
                                <Col>
                                    <Input placeholder='Tìm kiếm theo tên...' value={searchText} onChange={onChangeSearchText} />
                                </Col>
                                <Col>
                                    <div className='btn-search pointer'>Tìm kiếm</div>
                                </Col>
                            </Row>

                        </Col>
                        <Col>
                            <Button className={"btn-add weight-600"} onClick={() => navigate(ROUTE_PATH.ADD_TOUR)} type='text' icon={<PlusOutlined />} >  Thêm mới</Button>
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
                            render={(val) => (
                                <div>{convertDateOnly(val)} </div>
                            )}
                        />
                        <Column
                            title={"Ngày kết thúc"}
                            key={"ngayKetThuc"}
                            dataIndex={"ngayKetThuc"}
                            render={(val) => (
                                <div>{convertDateOnly(val)} </div>
                            )}
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
                            // width={"60px"}
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
                            )}
                        />
                    </Table>;
                    <div className='py-4'>
                        <PaginationCommon
                            title={"Số bản ghi mỗi trang"}
                            currentPage={page}
                            // isLastPage={isLastPage}
                            onSelect={onPageSizeChanged}
                            onFirstPage={onFirstPage}
                            onPreviousPage={onPreviousPage}
                            onNextPage={onNextPage}
                            onLastPage={onLastPage}
                        />
                    </div>
                </div>
            </MainLayout>
            <DialogConfirmCommon
                message={"Bạn có muốn xóa người dùng này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa người dùng"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteTour}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </div>

    )
}
