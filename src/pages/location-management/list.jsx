import { Button, Col, Dropdown, Input, Menu, Row, Select, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react';
import "../../assets/css/components/location/list.css"
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../infrastucture/api';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import Constants from '../../core/common/constant';
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { PaginationCommon } from '../../infrastucture/common/components/controls/pagination';
import DialogConfirmCommon from '../../infrastucture/common/components/modal/dialogConfirm';
import { useRecoilValue } from 'recoil';
import { CategoryState } from '../../core/common/atoms/category/categoryState';
import { DistrictState } from '../../core/common/atoms/district/districtState';
import { HeaderMainLayout } from '../../infrastucture/common/components/layout/Header';
import { convertTimeOnly } from '../../infrastucture/utils/helper';

let timeout
export const ListLocationManagement = () => {
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(Constants.PaginationConfigs.Size);
    const [page, setPage] = useState(1);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [idSelected, setIdSelected] = useState(null);
    const [pagination, setPagination] = useState({});
    const [totalItem, setTotalItem] = useState();

    const dataCategory = useRecoilValue(CategoryState);
    const dataDistrict = useRecoilValue(DistrictState);

    const [districtId, setDictrictId] = useState(1);
    const [categoryId, setCategoryId] = useState(1);
    const navigate = useNavigate();

    const onGetListLocationAsync = async ({ keyWord = "", limit = pageSize, page = 1, idQuanHuyen = districtId, idDanhMuc = categoryId }) => {
        if (dataCategory.length && dataDistrict.length) {
            const response = await api.getAllLocation(
                `${Constants.Params.searchName.trim()}=${keyWord}&${Constants.Params.limit}=${limit}&${Constants.Params.page}=${page}&${Constants.Params.idQuanHuyen}=${idQuanHuyen}&${Constants.Params.idDanhMuc}=${idDanhMuc}`,
                setLoading
            )
            if (response.data.diaDiems?.length > 0) {
                setData(response.data.diaDiems);
            }
            setPagination(response.data.pagination);
            setTotalItem(response.data.totalItems);
        }
    }
    const onSearch = async (keyWord = "", limit = pageSize, page = 1, idQuanHuyen = districtId, idDanhMuc = categoryId) => {
        await onGetListLocationAsync({ keyWord: keyWord, limit: limit, page: page, idQuanHuyen: idQuanHuyen, idDanhMuc: idDanhMuc })
    };

    useEffect(() => {
        if (dataCategory.length && dataDistrict.length) {
            onSearch().then(_ => { })
        }
    }, [dataCategory, dataDistrict])

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, page, districtId, categoryId).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };
    const onFirstPage = () => {
        setPage(1)
        onSearch(searchText, pageSize, 1, districtId, categoryId).then((_) => { });
    }
    const onPreviousPage = () => {
        setPage(prev => prev - 1);
        onSearch(searchText, pageSize, page - 1, districtId, categoryId).then((_) => { });
    };

    const onNextPage = () => {
        setPage(prev => prev + 1);
        onSearch(searchText, pageSize, page + 1, districtId, categoryId).then((_) => { });
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
    };
    const onDeleteLocation = async () => {
        await api.deleteLocation({
            id: idSelected
        },
            onSearch,
            setLoading
        )
        setIsDeleteModal(false);
    };
    const onChangeQuanHuyen = (value) => {
        setDictrictId(value)
        onSearch("", pageSize, page, value, categoryId).then((_) => { });
    };
    const onChangeDanhMuc = (value) => {
        setCategoryId(value)
        onSearch("", pageSize, page, districtId, value).then((_) => { });
    };
    const onNavigate = (id) => {
        navigate(`${(ROUTE_PATH.VIEW_LOCATION).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    const listAction = (record) => {
        return (
            <Menu>
                <Menu.Item className='title-action' onClick={() => onNavigate(record.idDiaDiem)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Sửa</div>
                </Menu.Item>
                <Menu.Item className='title-action' onClick={() => onOpenModalDelete(record.idDiaDiem)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Xóa</div>
                </Menu.Item>
            </Menu>
        )
    };
    return (
        <div>
            <MainLayout>
                <div className='flex flex-col'>
                    <HeaderMainLayout
                        breadcrumb="Trang chủ"
                        title="Quản lý địa điểm"
                        redirect={""}
                    />
                </div>
                <div className='main-page flex flex-col pt-2'>
                    <div className='bg-white px-4 py-3'>
                        <Row className='mb-4' gutter={[10, 10]} justify={"space-between"} align={"middle"}>
                            <Col xs={24} sm={24} lg={16}>
                                <Row align={"middle"} gutter={[10, 10]}>
                                    <Col xs={24} sm={12} lg={8}>
                                        <Input placeholder='Tìm kiếm theo tên...' value={searchText} onChange={onChangeSearchText} />
                                    </Col>
                                    <Col className='select-search' xs={24} sm={12} lg={8}>
                                        <Select
                                            value={districtId != null ? districtId : null}
                                            placeholder={"Chọn quận huyện"}
                                            className="w-100"
                                            onChange={onChangeQuanHuyen}
                                            getPopupContainer={(trigger) => trigger.parentNode}
                                        >
                                            {
                                                dataDistrict && dataDistrict.length &&
                                                dataDistrict.map((item, index) => {
                                                    return (
                                                        <Select.Option
                                                            key={index}
                                                            value={item.idQuanHuyen}
                                                            title={item.tenQuanHuyen}
                                                        >
                                                            {item.tenQuanHuyen}
                                                        </Select.Option>
                                                    );
                                                })
                                            }
                                        </Select>
                                    </Col>
                                    <Col className='select-search' xs={24} sm={12} lg={8}>
                                        <Select
                                            value={categoryId != null ? categoryId : null}
                                            placeholder={"Chọn danh mục"}
                                            className="w-100"
                                            onChange={onChangeDanhMuc}
                                            getPopupContainer={(trigger) => trigger.parentNode}
                                        >
                                            {
                                                dataCategory && dataCategory.length &&
                                                dataCategory.map((item, index) => {
                                                    return (
                                                        <Select.Option
                                                            key={index}
                                                            value={item.idDanhMucDiaDiem}
                                                            title={item.tenDanhMuc}
                                                        >
                                                            {item.tenDanhMuc}
                                                        </Select.Option>
                                                    );
                                                })
                                            }
                                        </Select>
                                    </Col>
                                </Row>

                            </Col>
                            <Col xs={4} sm={4} lg={4}>
                                <Button className={"btn-add weight-600"} onClick={() => navigate(ROUTE_PATH.ADD_LOCATION)} type='text' icon={<PlusOutlined />} >  Thêm mới</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='main-page h-100 flex-1 auto bg-white'>
                    <div className='bg-white'>
                        <Table
                            dataSource={data}
                            pagination={false}
                        >
                            <Column
                                title={"Tên địa điểm"}
                                key={"tenDiaDiem"}
                                dataIndex={"tenDiaDiem"}
                            />
                            <Column
                                title={"Địa chỉ"}
                                key={"diaChi"}
                                dataIndex={"diaChi"}
                            />
                            <Column
                                title={"Email liên hệ"}
                                key={"emailLienHe"}
                                dataIndex={"emailLienHe"}
                            />
                            <Column
                                title={"SĐT liên hệ"}
                                key={"sdtLienHe"}
                                dataIndex={"sdtLienHe"}
                            />
                            <Column
                                title={"Giờ mở cửa"}
                                key={"gioDongCua"}
                                dataIndex={"gioDongCua"}
                                render={(val) => (
                                    <div>{convertTimeOnly(val)} </div>
                                )}
                            />
                            <Column
                                title={"Giờ đóng cửa"}
                                key={"gioMoCua"}
                                dataIndex={"gioMoCua"}
                                render={(val) => (
                                    <div>{convertTimeOnly(val)} </div>
                                )}
                            />
                            <Column
                                title={"Thời gian ghé"}
                                key={"thoiGianGhe"}
                                dataIndex={"thoiGianGhe"}
                            />
                            <Column
                                title={"Thao tác"}
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
                        </Table>
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
            </MainLayout>
            <DialogConfirmCommon
                message={"Bạn có muốn xóa địa điểm này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa địa điểm"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteLocation}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </div >
    )
}
