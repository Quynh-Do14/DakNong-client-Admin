import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import '../../assets/css/components/news/add.css';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row, Upload } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputSelectCommon from '../../infrastucture/common/components/input/select-common';
import Constants from '../../core/common/constant';
import InputDateCommon from '../../infrastucture/common/components/input/input-date';
import { UploadOutlined } from '@ant-design/icons';
import InputTextAreaCommon from '../../infrastucture/common/components/input/input-text-area';
import { HeaderMainLayout } from '../../infrastucture/common/components/layout/Header';
import UploadFileCommon from '../../infrastucture/common/components/input/upload-file';
import { WarningMessage } from '../../infrastucture/common/components/toast/notificationToast';

export const AddNewsManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [imageName, setImageName] = useState("");
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

    const onBack = () => {
        navigate(ROUTE_PATH.NEWS)
    };

    const onCreateNews = async () => {
        var formdata = new FormData();
        await setSubmittedTime(Date.now());
        if (document.getElementById("file").files.length > 0) {
            formdata.append(
                "hinhAnh",
                document.getElementById("file").files[0],
                document.getElementById('file').value
            );
        }

        formdata.append("tieuDe", dataNews.tieuDe);
        formdata.append("status", 1);
        formdata.append("tieuDeCon", dataNews.tieuDeCon);
        formdata.append("moTaNgan", dataNews.moTaNgan);
        formdata.append("firstName", dataNews.firstName);
        formdata.append("chiTiet", dataNews.chiTiet);
        formdata.append("ngayDang", dataNews.ngayDang);
        formdata.append("luotXem", dataNews.luotXem);
        formdata.append("soSaoTrungBinh", dataNews.soSaoTrungBinh);
        formdata.append("diaChi", dataNews.diaChi);
        formdata.append("userId", dataNews.userId || 1);
        formdata.append("lat", 1);
        formdata.append("long", 1);
        formdata.append("geom", "POINT(-122.360 47.656)");
        if (isValidData()) {
            await api.createNews(
                formdata,
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        }
    };


    // const handleUpload = async () => {
    //     var formdata = new FormData();
    //     formdata.append(
    //         "file",
    //         document.getElementById("file").files[0],
    //         document.getElementById('file').value
    //     );
    //     formdata.append('status', 1);
    //     formdata.append('idTintuc', 1);
    //     formdata.append('idDiaDiem', 1);
    //     let request = await api.upload(formdata,
    //         setLoading
    //     )
    //     setImageName(request.data.link)
    // };
    return (
        <MainLayout>
            <div className='flex flex-col'>
                <HeaderMainLayout
                    breadcrumb="Quản lý tin tức"
                    title="Thêm mới"
                    redirect={`${ROUTE_PATH.NEWS}`}
                />
            </div>
            <div className='main-page flex flex-col pt-2'>
                <div className='bg-white px-8 py-3 title-page'>
                    Thêm mới tin tức
                </div>
            </div>
            <div className='main-page h-100 flex-1 auto bg-white px-8 py-4'>
                <div className='bg-white'>
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
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <UploadFileCommon
                                label={'Hình ảnh'}
                            // isRequired={true}
                            // handleUpload={handleUpload}
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
                        <Button onClick={onCreateNews} type='primary' className='btn-update'>Thêm mới</Button>
                    </Col>
                </Row>
            </div>
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
