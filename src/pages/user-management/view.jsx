import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import '../../assets/css/components/user/view.css';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputSelectCommon from '../../infrastucture/common/components/input/select-common';
import Constants from '../../core/common/constant';
import { HeaderMainLayout } from '../../infrastucture/common/components/layout/Header';

export const ViewUserManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailUser, setDetailUser] = useState({});
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataUser = _data;

    const setDataUser = (data) => {
        Object.assign(dataUser, { ...data });
        _setData({ ...dataUser });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });

        return allRequestOK;
    };


    const navigate = useNavigate();
    useEffect(() => {
        if (detailUser) {
            setDataUser({
                userName: detailUser.userName,
                role: detailUser.role,
                email: detailUser.email,
                firstName: detailUser.firstName,
                lastName: detailUser.lastName,
                sdt: detailUser.sdt,
                address: detailUser.address
            });
        };
    }, [detailUser]);
    const param = useParams();
    const onDetailUserAsync = async () => {
        const response = await api.getUserById({
            id: param.id,

        },
            setLoading
        )
        setDetailUser(response.user);
    };
    useEffect(() => {
        onDetailUserAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.USER)
    };

    const onUpdateUser = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.updateUser({
                id: parseInt(param.id),
                userName: dataUser.userName,
                role: dataUser.role,
                email: dataUser.email,
                firstName: dataUser.firstName,
                lastName: dataUser.lastName,
                sdt: dataUser.sdt,
                address: dataUser.address
            },
                onBack,
                setLoading
            )
        }
    };
    return (
        <div>
            <MainLayout>
                <div className='flex flex-col'>
                    <HeaderMainLayout
                        breadcrumb="Quản lý người dùng"
                        title="Xem chi tiết"
                        redirect={`${ROUTE_PATH.USER}`}
                    />
                </div>
                <div className='main-page flex flex-col pt-2'>
                    <div className='bg-white px-8 py-3 title-page'>
                        Xem thông tin chi tiết người dùng
                    </div>
                </div>
                <div className='main-page h-100 flex-1 auto bg-white px-8 py-4'>
                    <div className='bg-white'>
                        <Row gutter={[20, 20]}>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"Tên người dùng"}
                                    attribute={"userName"}
                                    isRequired={true}
                                    dataAttribute={dataUser.userName}
                                    setData={setDataUser}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputSelectCommon
                                    label={"Phân quyền"}
                                    attribute={"role"}
                                    isRequired={true}
                                    dataAttribute={dataUser.role}
                                    setData={setDataUser}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                    listDataOfItem={Constants.StatusUser.List}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"Email"}
                                    attribute={"email"}
                                    isRequired={true}
                                    dataAttribute={dataUser.email}
                                    setData={setDataUser}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"Họ"}
                                    attribute={"lastName"}
                                    isRequired={true}
                                    dataAttribute={dataUser.lastName}
                                    setData={setDataUser}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"Tên"}
                                    attribute={"firstName"}
                                    isRequired={true}
                                    dataAttribute={dataUser.firstName}
                                    setData={setDataUser}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"Số điện thoại"}
                                    attribute={"sdt"}
                                    isRequired={true}
                                    dataAttribute={dataUser.sdt}
                                    setData={setDataUser}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"Địa chỉ"}
                                    attribute={"address"}
                                    isRequired={true}
                                    dataAttribute={dataUser.address}
                                    setData={setDataUser}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='container-btn main-page bg-white p-4 flex flex-col '>
                    <Row justify={"center"}>
                        <Col className='mx-1'>
                            <Button onClick={onBack} type='link' className='btn-back'>Quay lại</Button>
                        </Col>
                        <Col className='mx-1'>
                            <Button onClick={onUpdateUser} type='primary' className='btn-update'>Cập nhật</Button>
                        </Col>
                        {/* <Col className='mx-1'>
                            <Button onClick={onBack} type='primary' className='btn-cancel'>Hủy bỏ</Button>
                        </Col> */}
                    </Row>
                </div >
            </MainLayout >
            <FullPageLoading isLoading={loading} />
        </div >
    )
}
