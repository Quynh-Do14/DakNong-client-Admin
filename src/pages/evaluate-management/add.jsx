import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import '../../assets/css/components/evaluate/add.css';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputSelectCommon from '../../infrastucture/common/components/input/select-common';
import Constants from '../../core/common/constant';
import InputDateCommon from '../../infrastucture/common/components/input/input-date';

export const AddEvaluateManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataEvaluate = _data;

    const setDataEvaluate = (data) => {
        Object.assign(dataEvaluate, { ...data });
        _setData({ ...dataEvaluate });
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
        navigate(ROUTE_PATH.EVALUATE)
    };

    const onCreateEvaluate = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.createEvaluate({
                userId: parseInt(dataEvaluate.userId),
                soSao: dataEvaluate.soSao,
                noiDung: dataEvaluate.noiDung,
                thoiGianDanhGia: dataEvaluate.thoiGianDanhGia,
                idDiaDiem: parseInt(dataEvaluate.idDiaDiem),
                idTinTuc: parseInt(dataEvaluate.idTinTuc),
                idTour: parseInt(dataEvaluate.idTour),
            },
                onBack,
                setLoading
            )
        }
    };
    return (
        <div>
            <MainLayout breadcrumb="Quản lý đánh giá" title="Thêm mới" redirect={`${ROUTE_PATH.EVALUATE}`}>
                <div className='add-evaluate-pg'>
                    <div className='title py-3'>
                        Thêm mới đánh giá
                    </div>
                    <div className='content mb-3'>
                        <InputTextCommon
                            label={"Người dùng"}
                            attribute={"userId"}
                            isRequired={true}
                            dataAttribute={dataEvaluate.userId}
                            setData={setDataEvaluate}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Số sao"}
                            attribute={"soSao"}
                            isRequired={true}
                            dataAttribute={dataEvaluate.soSao}
                            setData={setDataEvaluate}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputDateCommon
                            label={"Thời gian đánh giá"}
                            attribute={"thoiGianDanhGia"}
                            isRequired={true}
                            dataAttribute={dataEvaluate.thoiGianDanhGia}
                            setData={setDataEvaluate}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Nội dung"}
                            attribute={"noiDung"}
                            isRequired={true}
                            dataAttribute={dataEvaluate.noiDung}
                            setData={setDataEvaluate}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Địa điểm"}
                            attribute={"idDiaDiem"}
                            isRequired={true}
                            dataAttribute={dataEvaluate.idDiaDiem}
                            setData={setDataEvaluate}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Tin tức"}
                            attribute={"idTinTuc"}
                            isRequired={true}
                            dataAttribute={dataEvaluate.idTinTuc}
                            setData={setDataEvaluate}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Tour"}
                            attribute={"idTour"}
                            isRequired={true}
                            dataAttribute={dataEvaluate.idTour}
                            setData={setDataEvaluate}
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
                                <Button onClick={onCreateEvaluate} type='primary' className='btn-update'>Thêm mới</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </MainLayout>
            <FullPageLoading isLoading={loading} />
        </div>
    )
}
