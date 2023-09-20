import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import '../../assets/css/components/location/add.css';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputSelectCommon from '../../infrastucture/common/components/input/select-common';
import Constants from '../../core/common/constant';

export const AddLocationManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataLocation = _data;

    const setDataLocation = (data) => {
        Object.assign(dataLocation, { ...data });
        _setData({ ...dataLocation });
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
        navigate(ROUTE_PATH.LOCATION)
    };

    const onCreateLocation = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.createLocation({
                LocationName: dataLocation.LocationName,
                password: "123456aA",
                status: 1,
                role: dataLocation.role,
                email: dataLocation.email,
                firstName: dataLocation.firstName,
                lastName: dataLocation.lastName,
                sdt: dataLocation.sdt,
                address: dataLocation.address
            },
                onBack,
                setLoading
            )
        }
    };
    return (
        <div>
            <MainLayout breadcrumb="Quản lý địa điểm" title="Thêm mới" redirect={`${ROUTE_PATH.LOCATION}`}>
                <div className='add-Location-pg'>
                    <div className='title py-3'>
                        Thêm mới địa điểm
                    </div>
                    <div className='content mb-3'>
                        <InputTextCommon
                            label={"Tên địa điểm"}
                            attribute={"LocationName"}
                            isRequired={true}
                            dataAttribute={dataLocation.LocationName}
                            setData={setDataLocation}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputSelectCommon
                            label={"Phân quyền"}
                            attribute={"role"}
                            isRequired={true}
                            dataAttribute={dataLocation.role}
                            setData={setDataLocation}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                            listDataOfItem={Constants.StatusLocation.List}
                        />
                        <InputTextCommon
                            label={"Email"}
                            attribute={"email"}
                            isRequired={true}
                            dataAttribute={dataLocation.email}
                            setData={setDataLocation}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Họ"}
                            attribute={"lastName"}
                            isRequired={true}
                            dataAttribute={dataLocation.lastName}
                            setData={setDataLocation}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Tên"}
                            attribute={"firstName"}
                            isRequired={true}
                            dataAttribute={dataLocation.firstName}
                            setData={setDataLocation}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Số điện thoại"}
                            attribute={"sdt"}
                            isRequired={true}
                            dataAttribute={dataLocation.sdt}
                            setData={setDataLocation}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Địa chỉ"}
                            attribute={"address"}
                            isRequired={true}
                            dataAttribute={dataLocation.address}
                            setData={setDataLocation}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </div>
                    <div className=''>
                        <Row justify={"center"}>
                            <Col className='mx-1'>
                                <Button onClick={onBack} type='link' className='btn-back'>Quay lại</Button>
                            </Col>
                            <Col className='mx-1'>
                                <Button onClick={onCreateLocation} type='primary' className='btn-update'>Thêm mới</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </MainLayout>
            <FullPageLoading isLoading={loading} />
        </div>
    )
}
