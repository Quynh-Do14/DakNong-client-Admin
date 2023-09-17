import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import '../../assets/css/components/category/view.css';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';

export const ViewCategoryManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailCategory, setDetailCategory] = useState({});
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataCategory = _data;

    const setDataCategory = (data) => {
        Object.assign(dataCategory, { ...data });
        _setData({ ...dataCategory });
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
        if (detailCategory) {
            setDataCategory({
                tenDanhMuc: detailCategory.tenDanhMuc,
            });
        };
    }, [detailCategory]);
    const param = useParams();
    const onDetailCategoryAsync = async () => {
        const response = await api.getCategoryById({
            id: param.id,

        },
            setLoading
        )
        setDetailCategory(response.danhMuc);
    };
    useEffect(() => {
        onDetailCategoryAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.CATEGORY)
    };

    const onUpdateUser = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.updateCategory({
                idDanhMucDiaDiem: param.id,
                tenDanhMuc: dataCategory.tenDanhMuc,
                status: 1,
            },
                onBack,
                setLoading
            )
        }
    };

    return (
        <div>
            <MainLayout breadcrumb="Quản lý danh mục" title="Xem chi tiết" redirect={`${ROUTE_PATH.CATEGORY}`}>
                <div className='view-category-pg'>
                    <div className='title py-3'>
                        Xem thông tin chi tiết danh mục
                    </div>
                    <div className='content mb-3'>
                        <InputTextCommon
                            label={"Tên danh mục"}
                            attribute={"tenDanhMuc"}
                            isRequired={false}
                            dataAttribute={dataCategory.tenDanhMuc}
                            setData={setDataCategory}
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
                                <Button onClick={onUpdateUser} type='primary' className='btn-update'>Cập nhật</Button>
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
