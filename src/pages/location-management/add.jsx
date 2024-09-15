import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import '../../assets/css/components/location/add.css';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputTextAreaCommon from '../../infrastucture/common/components/input/input-text-area';
import InputNumberCommon from '../../infrastucture/common/components/input/input-number';
import InputTimePickerCommon from '../../infrastucture/common/components/input/input-timepicker';
import { HeaderMainLayout } from '../../infrastucture/common/components/layout/Header';
import UploadFileCommon from '../../infrastucture/common/components/input/upload-file';
import InputSelectDistrictCommon from '../../infrastucture/common/components/input/select-district';
import InputSelectCategoryCommon from '../../infrastucture/common/components/input/select-category';
import { WarningMessage } from '../../infrastucture/common/components/toast/notificationToast';

export const AddLocationManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [imageName, setImageName] = useState("");
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
        var formdata = new FormData();
        await setSubmittedTime(Date.now());
        if (document.getElementById("file").files.length > 0) {
            formdata.append(
                "hinhAnh",
                document.getElementById("file").files[0],
                document.getElementById('file').value
            );
        };
        formdata.append("tenDiaDiem", dataLocation.tenDiaDiem);
        formdata.append("status", 1);
        formdata.append("diaChi", dataLocation.diaChi);
        formdata.append("uriVideo", dataLocation.uriVideo);
        formdata.append("moTa", dataLocation.moTa);
        formdata.append("uriBaiViet", dataLocation.uriBaiViet);
        formdata.append("idQuanHuyen", dataLocation.idQuanHuyen);
        formdata.append("idDanhMuc", dataLocation.idDanhMuc);
        formdata.append("soSaoTrungBinh", dataLocation.soSaoTrungBinh);
        formdata.append("emailLienHe", dataLocation.emailLienHe);
        formdata.append("sdtLienHe", dataLocation.sdtLienHe);
        formdata.append("gioMoCua", dataLocation.gioMoCua);
        formdata.append("gioDongCua", dataLocation.gioDongCua);
        formdata.append("thoiGianGhe", dataLocation.thoiGianGhe);
        formdata.append("luotXem", dataLocation.luotXem);
        formdata.append("lat", 1);
        formdata.append("long", 1);
        formdata.append("geom", "POINT(-122.360 47.656)");
        if (isValidData()) {
            await api.createLocation(
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
        <div>
            <MainLayout>
                <div className='flex flex-col'>
                    <HeaderMainLayout
                        breadcrumb="Quản lý địa điểm"
                        title="Thêm mới"
                        redirect={`${ROUTE_PATH.LOCATION}`}
                    />
                </div>
                <div className='main-page flex flex-col pt-2'>
                    <div className='bg-white px-8 py-3 title-page'>
                        Thêm mới địa điểm
                    </div>
                </div>
                <div className='main-page h-100 flex-1 auto bg-white px-8 py-4'>
                    <div className='bg-white'>
                        <Row gutter={[10, 10]}>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"Tên địa điểm"}
                                    attribute={"tenDiaDiem"}
                                    isRequired={true}
                                    dataAttribute={dataLocation.tenDiaDiem}
                                    setData={setDataLocation}
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
                                    dataAttribute={dataLocation.diaChi}
                                    setData={setDataLocation}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"URL Video"}
                                    attribute={"uriVideo"}
                                    isRequired={true}
                                    dataAttribute={dataLocation.uriVideo}
                                    setData={setDataLocation}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"URL bài viết"}
                                    attribute={"uriBaiViet"}
                                    isRequired={true}
                                    dataAttribute={dataLocation.uriBaiViet}
                                    setData={setDataLocation}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputSelectDistrictCommon
                                    label={"Quận huyện"}
                                    attribute={"idQuanHuyen"}
                                    isRequired={true}
                                    dataAttribute={dataLocation.idQuanHuyen}
                                    setData={setDataLocation}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}

                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputSelectCategoryCommon
                                    label={"Danh mục"}
                                    attribute={"idDanhMuc"}
                                    isRequired={true}
                                    dataAttribute={dataLocation.idDanhMuc}
                                    setData={setDataLocation}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}

                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputNumberCommon
                                    label={"Số sao trung bình"}
                                    attribute={"soSaoTrungBinh"}
                                    isRequired={true}
                                    dataAttribute={dataLocation.soSaoTrungBinh}
                                    setData={setDataLocation}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"Email liên hệ"}
                                    attribute={"emailLienHe"}
                                    isRequired={true}
                                    dataAttribute={dataLocation.emailLienHe}
                                    setData={setDataLocation}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTimePickerCommon
                                    label={"Giờ mở cửa"}
                                    attribute={"gioMoCua"}
                                    isRequired={true}
                                    dataAttribute={dataLocation.gioMoCua}
                                    setData={setDataLocation}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTimePickerCommon
                                    label={"Giờ đóng cửa"}
                                    attribute={"gioDongCua"}
                                    isRequired={true}
                                    dataAttribute={dataLocation.gioDongCua}
                                    setData={setDataLocation}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputNumberCommon
                                    label={"Thời gian ghé"}
                                    attribute={"thoiGianGhe"}
                                    isRequired={true}
                                    dataAttribute={dataLocation.thoiGianGhe}
                                    setData={setDataLocation}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextCommon
                                    label={"SĐT liên hệ"}
                                    attribute={"sdtLienHe"}
                                    isRequired={true}
                                    dataAttribute={dataLocation.sdtLienHe}
                                    setData={setDataLocation}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputNumberCommon
                                    label={"Lượt xem"}
                                    attribute={"luotXem"}
                                    isRequired={true}
                                    dataAttribute={dataLocation.luotXem}
                                    setData={setDataLocation}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <InputTextAreaCommon
                                    label={"Mô tả"}
                                    attribute={"moTa"}
                                    isRequired={true}
                                    dataAttribute={dataLocation.moTa}
                                    setData={setDataLocation}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <UploadFileCommon
                                    label={'Hình ảnh'}
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
                            <Button onClick={onCreateLocation} type='primary' className='btn-update'>Thêm mới</Button>
                        </Col>
                    </Row>
                </div>
                <FullPageLoading isLoading={loading} />
            </MainLayout >
        </div >
    )
}
