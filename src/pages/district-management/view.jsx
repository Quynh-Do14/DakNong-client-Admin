import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import '../../assets/css/components/district/view.css';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';

export const ViewDistrictManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailDistrict, setDetailDistrict] = useState({});
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
    useEffect(() => {
        if (detailDistrict) {
            setDataDistrict({
                tenQuanHuyen: detailDistrict.tenQuanHuyen,
                status: detailDistrict.status,
            });
        };
    }, [detailDistrict]);
    const param = useParams();
    const onDetailDistrictAsync = async () => {
        const response = await api.getDistrictById({
            id: param.id,

        },
            setLoading
        )
        setDetailDistrict(response.quanHuyen);
    };
    useEffect(() => {
        onDetailDistrictAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.DISTRICT)
    };

    const onUpdateDistrict = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.updateDistrict({
                idDanhMucDiaDiem: param.id,
                tenQuanHuyen: dataDistrict.tenQuanHuyen,
                status: dataDistrict.status,
            },
                onBack,
                setLoading
            )
        }
    };

    return (
        <div>
            <MainLayout breadcrumb="Quản lý quận huyện" title="Xem chi tiết" redirect={`${ROUTE_PATH.DISTRICT}`}>
                <div className='view-district-pg'>
                    <div className='title py-3'>
                        Xem thông tin chi tiết quận huyện
                    </div>
                    <div className='content mb-3'>
                        <InputTextCommon
                            label={"Tên quận huyện"}
                            attribute={"tenQuanHuyen"}
                            isRequired={true}
                            dataAttribute={dataDistrict.tenQuanHuyen}
                            setData={setDataDistrict}
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
                                <Button onClick={onUpdateDistrict} type='primary' className='btn-update'>Cập nhật</Button>
                            </Col>
                            <Col className='mx-1'>
                                <Button onClick={onBack} type='primary' className='btn-cancel'>Hủy bỏ</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </MainLayout >
            <FullPageLoading isLoading={loading} />
        </div >
    )
}
