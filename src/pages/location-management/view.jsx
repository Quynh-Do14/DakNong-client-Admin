import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import { HeaderMainLayout } from '../../infrastucture/common/components/layout/Header';
import InputSelectDistrictCommon from '../../infrastucture/common/components/input/select-district';
import InputNumberCommon from '../../infrastucture/common/components/input/input-number';
import UploadFileCommon from '../../infrastucture/common/components/input/upload-file';
import InputTextAreaCommon from '../../infrastucture/common/components/input/input-text-area';
import InputTimePickerCommon from '../../infrastucture/common/components/input/input-timepicker';

export const ViewLocationManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailLocation, setDetailLocation] = useState({});
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
    useEffect(() => {
        if (detailLocation) {
            setDataLocation({
                tenDiaDiem: detailLocation.tenDiaDiem,
                status: 1,
                diaChi: detailLocation.diaChi,
                uriVideo: detailLocation.uriVideo,
                moTa: detailLocation.moTa,
                uriBaiViet: detailLocation.uriBaiViet,
                idQuanHuyen: parseInt(detailLocation.idQuanHuyen),
                soSaoTrungBinh: detailLocation.soSaoTrungBinh,
                emailLienHe: detailLocation.emailLienHe,
                sdtLienHe: detailLocation.sdtLienHe,
                gioMoCua: detailLocation.gioMoCua,
                gioDongCua: detailLocation.gioDongCua,
                thoiGianGhe: detailLocation.thoiGianGhe,
                luotXem: detailLocation.luotXem,
                lat: 1,
                long: 1,
                geom: "POINT(-122.360 47.656)",
                hinhAnh: imageName

            });
        };
    }, [detailLocation]);

    const handleUpload = async () => {
        var formdata = new FormData();
        formdata.append(
            "file",
            document.getElementById("file").files[0],
            document.getElementById('file').value
        );
        formdata.append('status', 1);
        formdata.append('idTintuc', 1);
        formdata.append('idDiaDiem', 1);
        let request = await api.upload(formdata,
            setLoading
        )
        setImageName(request.data.link)
    };

    const param = useParams();
    const onDetailLocationAsync = async () => {
        const response = await api.getLocationById({
            id: param.id,

        },
            setLoading
        )
        setDetailLocation(response.diaDiem);
    };
    useEffect(() => {
        onDetailLocationAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.LOCATION)
    };

    const onUpdateLocation = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.updateLocation({
                idDiaDiem: parseInt(param.id),
                tenDiaDiem: dataLocation.tenDiaDiem,
                status: 1,
                diaChi: dataLocation.diaChi,
                uriVideo: dataLocation.uriVideo,
                moTa: dataLocation.moTa,
                uriBaiViet: dataLocation.uriBaiViet,
                idQuanHuyen: parseInt(dataLocation.idQuanHuyen),
                soSaoTrungBinh: dataLocation.soSaoTrungBinh,
                emailLienHe: dataLocation.emailLienHe,
                sdtLienHe: dataLocation.sdtLienHe,
                gioMoCua: dataLocation.gioMoCua,
                gioDongCua: dataLocation.gioDongCua,
                thoiGianGhe: dataLocation.thoiGianGhe,
                luotXem: dataLocation.luotXem,
                lat: dataLocation.lat,
                long: dataLocation.long,
                geom: dataLocation.geom,
                hinhAnh: imageName || dataLocation.hinhAnh
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
                    breadcrumb="Quản lý địa điểm"
                    title="Xem chi tiết"
                    redirect={`${ROUTE_PATH.LOCATION}`}
                />
            </div>
            <div className='main-page flex flex-col pt-2'>
                <div className='bg-white px-8 py-3 title-page'>
                    Xem thông tin chi tiết địa điểm
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
                                handleUpload={handleUpload}
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
                        <Button onClick={onUpdateLocation} type='primary' className='btn-update'>Thêm mới</Button>
                    </Col>
                </Row>
            </div>
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
