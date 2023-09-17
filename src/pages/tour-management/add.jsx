import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import '../../assets/css/components/tour/add.css';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputSelectCommon from '../../infrastucture/common/components/input/select-common';
import Constants from '../../core/common/constant';
import InputDateCommon from '../../infrastucture/common/components/input/input-date';

export const AddTourManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataTour = _data;

    const setDataTour = (data) => {
        Object.assign(dataTour, { ...data });
        _setData({ ...dataTour });
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
        navigate(ROUTE_PATH.TOUR)
    };

    const onCreateTour = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.createTour({
                tenTour: dataTour.tenTour,
                status: 1,
                chiPhi: dataTour.chiPhi,
                ngayBatDau: dataTour.ngayBatDau,
                ngayKetThuc: dataTour.ngayKetThuc,
                khoangCach: parseInt(dataTour.khoangCach),
                soDiaDiem: parseInt(dataTour.soDiaDiem),
                soNgay: parseInt(dataTour.soNgay),
                luotXem: 1,
                userId:1
            },
                onBack,
                setLoading
            )
        }
    };
    return (
        <div>
            <MainLayout breadcrumb="Quản lý tour" title="Thêm mới" redirect={`${ROUTE_PATH.Tour}`}>
                <div className='add-tour-pg'>
                    <div className='title py-3'>
                        Thêm mới tour
                    </div>
                    <div className='content mb-3'>
                        <InputTextCommon
                            label={"Tên tour"}
                            attribute={"tenTour"}
                            isRequired={true}
                            dataAttribute={dataTour.tenTour}
                            setData={setDataTour}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Chi phí"}
                            attribute={"chiPhi"}
                            isRequired={true}
                            dataAttribute={dataTour.chiPhi}
                            setData={setDataTour}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputDateCommon
                            label={"Ngày bắt đầu"}
                            attribute={"ngayBatDau"}
                            isRequired={true}
                            dataAttribute={dataTour.ngayBatDau}
                            setData={setDataTour}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputDateCommon
                            label={"Ngày kết thúc"}
                            attribute={"ngayKetThuc"}
                            isRequired={true}
                            dataAttribute={dataTour.ngayKetThuc}
                            setData={setDataTour}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />

                        <InputTextCommon
                            label={"Khoảng cách"}
                            attribute={"khoangCach"}
                            isRequired={true}
                            dataAttribute={dataTour.khoangCach}
                            setData={setDataTour}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Số địa điểm"}
                            attribute={"soDiaDiem"}
                            isRequired={true}
                            dataAttribute={dataTour.soDiaDiem}
                            setData={setDataTour}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Số ngày"}
                            attribute={"soNgay"}
                            isRequired={true}
                            dataAttribute={dataTour.soNgay}
                            setData={setDataTour}
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
                                <Button onClick={onCreateTour} type='primary' className='btn-update'>Thêm mới</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </MainLayout>
            <FullPageLoading isLoading={loading} />
        </div>
    )
}
