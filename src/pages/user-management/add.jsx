import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputSelectCommon from '../../infrastucture/common/components/input/select-common';
import Constants from '../../core/common/constant';
import { HeaderMainLayout } from '../../infrastucture/common/components/layout/Header';

export const AddUserManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
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

    const onBack = () => {
        navigate(ROUTE_PATH.USER)
    };

    const onCreateUser = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.createUser({
                userName: dataUser.userName,
                password: "123456aA",
                status: 1,
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
                        title="Thêm mới"
                        redirect={`${ROUTE_PATH.USER}`}
                    />
                </div>
                <div className='main-page flex flex-col pt-2'>
                    <div className='bg-white px-8 py-3 title-page'>
                        Thêm mới người dùng
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
                            <Button onClick={onCreateUser} type='primary' className='btn-update'>Thêm mới</Button>
                        </Col>
                    </Row>
                </div >
                <FullPageLoading isLoading={loading} />

            </MainLayout >
        </div >
    )
}
