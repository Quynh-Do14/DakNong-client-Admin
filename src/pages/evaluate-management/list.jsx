import { Button, Col, Dropdown, Input, Menu, Row, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react';
import "../../assets/css/components/evaluate/list.css"
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
import { HeaderMainLayout } from '../../infrastucture/common/components/layout/Header';

let timeout
export const ListEvaluateManagement = () => {
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(Constants.PaginationConfigs.Size);
    const [page, setPage] = useState(1);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [idSelected, setIdSelected] = useState(null);
    const [pagination, setPagination] = useState({});
    const [totalItem, setTotalItem] = useState();

    const navigate = useNavigate();

    const onGetListEvaluateAsync = async ({ keyWord = "", limit = pageSize, page = 1 }) => {
        const response = await api.getAllEvaluate(`${Constants.Params.searchName}=${keyWord}&${Constants.Params.limit}=${limit}&${Constants.Params.page}= ${page}`,
            setLoading
        )
        if (response.data.danhGias?.length > 0) {
            setData(response.data.danhGias)
        }
        setPagination(response.data.pagination);
        setTotalItem(response.data.totalItems);
    }
    const onSearch = async (keyWord = "", limit = pageSize, page = 1) => {
        await onGetListEvaluateAsync({ keyWord: keyWord, limit: limit, page: page })
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
        let lastPage = Math.floor(totalItem / pagination.limit);
        setPage(lastPage);
        onSearch(searchText, pageSize, lastPage).then((_) => { });
    }

    let isLastPage = (pagination.limit * pagination.page) < totalItem ? false : true


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

    const onDeleteEvaluate = async () => {
        await api.deleteEvaluate({
            id: idSelected
        },
            onSearch,
            setLoading
        )
        setIsDeleteModal(false);
    };

    const onNavigate = (idDanhGia) => {
        navigate(`${(ROUTE_PATH.VIEW_EVALUATE).replace(`${Constants.UseParams.Id}`, "")}${idDanhGia}`);
    }

    const listAction = (record) => {
        return (
            <Menu>
                <Menu.Item className='title-action' onClick={() => onNavigate(record.idDanhGia)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Sửa</div>
                </Menu.Item>
                <Menu.Item className='title-action' onClick={() => onOpenModalDelete(record.idDanhGia)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Xóa</div>
                </Menu.Item>
            </Menu>
        )
    };
    return (
        <MainLayout>
            <div className='flex flex-col'>
                <HeaderMainLayout
                    breadcrumb="Trang chủ"
                    title="Quản lý đánh giá"
                    redirect={""}
                />
            </div>
            <div className='main-page flex flex-col pt-2'>
                <div className='bg-white p-4'>
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
                            <Button className={"btn-add weight-600"} onClick={() => navigate(ROUTE_PATH.ADD_EVALUATE)} type='text' icon={<PlusOutlined />} >  Thêm mới</Button>
                        </Col>
                    </Row>
                    <Row className='' justify={"space-between"} align={"middle"}>
                        <Col className='title'>Danh sách đánh giá</Col>
                    </Row>
                </div>
            </div>
            <div className='main-page h-100 flex-1 auto bg-white'>
                <div className=''>
                    <Table
                        dataSource={data}
                        pagination={false}
                    >
                        <Column
                            title={"Đánh giá"}
                            key={"idDanhGia"}
                            dataIndex={"idDanhGia"}
                        />
                        <Column
                            title={"Địa điểm"}
                            key={"idDiaDiem"}
                            dataIndex={"idDiaDiem"}
                        />
                        <Column
                            title={"Tin tức"}
                            key={"idTinTuc"}
                            dataIndex={"idTinTuc"}
                        />

                        <Column
                            title={"Tour"}
                            key={"idTour"}
                            dataIndex={"idTour"}
                        />
                        <Column
                            title={"Nội dung"}
                            key={"noiDung"}
                            dataIndex={"noiDung"}
                        />
                        <Column
                            title={"Số sao"}
                            key={"soSao"}
                            dataIndex={"soSao"}
                        />
                        <Column
                            title={"Thời gian đánh giá"}
                            key={"thoiGianDanhGia"}
                            dataIndex={"thoiGianDanhGia"}
                            render={(val) => (
                                <div>{convertDateOnly(val)} </div>
                            )}
                        />
                        <Column
                            title={"Người dùng"}
                            key={"userId"}
                            dataIndex={"userId"}
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
                </div>
            </div>
            <div className='main-page bg-white p-4 flex flex-col '>
                <PaginationCommon
                    title={"Số bản ghi mỗi trang"}
                    currentPage={page}
                    isLastPage={isLastPage}
                    onSelect={onPageSizeChanged}
                    onFirstPage={onFirstPage}
                    onPreviousPage={onPreviousPage}
                    onNextPage={onNextPage}
                    onLastPage={onLastPage}
                />
            </div>
            <DialogConfirmCommon
                message={"Bạn có muốn xóa đánh giá này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa đánh giá"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteEvaluate}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </MainLayout>
    )
}
