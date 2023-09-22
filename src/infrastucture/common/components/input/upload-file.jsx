/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Col, Row } from 'antd';
import { MessageError } from '../controls/MessageError';
import '../../../../assets/css/common/input.css'
const UploadFileCommon = (props) => {
    const {
        label,
        isRequired,
        handleUpload
    } = props;
    return (
        <div>
            <Row className='mb-4 input-common'>
                <Col xs={24} sm={10} lg={5} xl={3} className='title'>
                    <span >
                        <span className='label'>{label}</span>
                        <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                    </span>
                </Col>
                <Col xs={24} sm={14} lg={19} xl={21}>
                    <input type='file' onChange={handleUpload} id='file'/>
                </Col>
            </Row>
        </div>
    )
};
export default UploadFileCommon;