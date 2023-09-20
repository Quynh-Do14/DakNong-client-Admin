import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import '../../assets/css/components/news/view.css';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputSelectCommon from '../../infrastucture/common/components/input/select-common';
import Constants from '../../core/common/constant';
import InputDateCommon from '../../infrastucture/common/components/input/input-date';
import InputTextAreaCommon from '../../infrastucture/common/components/input/input-text-area';

export const ViewNewsManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailNews, setDetailNews] = useState({});
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataNews = _data;

    const setDataNews = (data) => {
        Object.assign(dataNews, { ...data });
        _setData({ ...dataNews });
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
        if (detailNews) {
            setDataNews({
                tieuDe: detailNews.tieuDe,
                tieuDeCon: detailNews.tieuDeCon,
                moTaNgan: detailNews.moTaNgan,
                firstName: detailNews.firstName,
                chiTiet: detailNews.chiTiet,
                ngayDang: detailNews.ngayDang,
                lat: detailNews.lat,
                long: detailNews.long,
                soSaoTrungBinh: detailNews.soSaoTrungBinh,
                luotXem: detailNews.luotXem,
                diaChi: detailNews.diaChi,

            });
        };
    }, [detailNews]);
    const param = useParams();
    const onDetailNewsAsync = async () => {
        const response = await api.getNewsById({
            id: param.id,

        },
            setLoading
        )
        setDetailNews(response.tinTuc);
    };
    useEffect(() => {
        onDetailNewsAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.NEWS)
    };

    const onUpdateNews = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.updateNews({
                id: parseInt(param.id),
                tieuDe: dataNews.tieuDe,
                tieuDeCon: dataNews.tieuDeCon,
                moTaNgan: dataNews.moTaNgan,
                firstName: dataNews.firstName,
                chiTiet: dataNews.chiTiet,
                ngayDang: dataNews.ngayDang,
                lat: 1,
                long: 1,
                geom: "POINT(-122.360 47.656)",
                soSaoTrungBinh: dataNews.soSaoTrungBinh,
                luotXem: dataNews.luotXem,
                diaChi: dataNews.diaChi,
                status: 1,
            },
                onBack,
                setLoading
            )
        }
    };

    return (
        <div>
            <MainLayout breadcrumb="Quản lý tin tức" title="Xem chi tiết" redirect={`${ROUTE_PATH.NEWS}`}>
                <div className='view-news-pg'>
                    <div className='title py-3'>
                        Xem thông tin chi tiết tin tức
                    </div>
                    <div className='content mb-3'>
                        <Row gutter={[10, 10]}>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"Tiêu đề"}
                                    attribute={"tieuDe"}
                                    isRequired={true}
                                    dataAttribute={dataNews.tieuDe}
                                    setData={setDataNews}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"Tiêu đề con"}
                                    attribute={"tieuDeCon"}
                                    isRequired={true}
                                    dataAttribute={dataNews.tieuDeCon}
                                    setData={setDataNews}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextAreaCommon
                                    label={"Mô tả ngắn"}
                                    attribute={"moTaNgan"}
                                    isRequired={true}
                                    dataAttribute={dataNews.moTaNgan}
                                    setData={setDataNews}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextAreaCommon
                                    label={"Chi tiết"}
                                    attribute={"chiTiet"}
                                    isRequired={true}
                                    dataAttribute={dataNews.chiTiet}
                                    setData={setDataNews}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputDateCommon
                                    label={"Ngày đăng"}
                                    attribute={"ngayDang"}
                                    isRequired={true}
                                    dataAttribute={dataNews.ngayDang}
                                    setData={setDataNews}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"Số sao trung bình"}
                                    attribute={"soSaoTrungBinh"}
                                    isRequired={true}
                                    dataAttribute={dataNews.soSaoTrungBinh}
                                    setData={setDataNews}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"Địa chỉ"}
                                    attribute={"diaChi"}
                                    isRequired={true}
                                    dataAttribute={dataNews.diaChi}
                                    setData={setDataNews}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"Lượt xem"}
                                    attribute={"luotXem"}
                                    isRequired={true}
                                    dataAttribute={dataNews.luotXem}
                                    setData={setDataNews}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className=''>
                        <Row justify={"center"}>
                            <Col className='mx-1'>
                                <Button onClick={onBack} type='link' className='btn-back'>Quay lại</Button>
                            </Col>
                            <Col className='mx-1'>
                                <Button onClick={onUpdateNews} type='primary' className='btn-update'>Cập nhật</Button>
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
