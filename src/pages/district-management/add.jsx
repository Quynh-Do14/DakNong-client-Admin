import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import '../../assets/css/components/district/add.css';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';

export const AddDistrictManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataDistrict = _data;

    const setDataDistrict = (data) => {
        Object.assign(dataDistrict, { ...data });
        _setData({ ...dataDistrict });
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
        navigate(ROUTE_PATH.DISTRICT)
    };

    const onCreateDistrict = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.createDistrict({
                tenQuanHuyen: dataDistrict.tenQuanHuyen,
                status: 1,
            },
                onBack,
                setLoading
            )
        }
    };
    return (
        <MainLayout>
            <div className='flex flex-col'>
                <HeaderMainLayout
                    breadcrumb="Quản lý quận huyện"
                    title="Thêm mới"
                    redirect={`${ROUTE_PATH.DISTRICT}`}
                />
            </div>
            <div className='main-page flex flex-col pt-2'>
                <div className='bg-white px-8 py-3 title-page'>
                    Thêm mới quận huyện
                </div>
            </div>
            <div className='main-page h-100 flex-1 auto bg-white px-8 py-4'>
                <div className='bg-white'>
                    <InputTextCommon
                        label={"Tên quận huyện"}
                        attribute={"tenQuanHuyen"}
                        isRequired={true}
                        dataAttribute={dataCategory.tenQuanHuyen}
                        setData={setDataCategory}
                        disabled={false}
                        validate={validate}
                        setValidate={setValidate}
                        submittedTime={submittedTime}
                    />
                </div>
                <div className='container-btn main-page bg-white p-4 flex flex-col '>
                    <Row justify={"center"}>
                        <Col className='mx-1'>
                            <Button onClick={onBack} type='link' className='btn-back'>Quay lại</Button>
                        </Col>
                        <Col className='mx-1'>
                            <Button onClick={onCreateDistrict} type='primary' className='btn-update'>Thêm mới</Button>
                        </Col>
                    </Row>
                </div >
            </div>
            <FullPageLoading isLoading={loading} />
        </MainLayout>
    )
}
