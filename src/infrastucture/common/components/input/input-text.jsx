/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Col, Input, Row } from 'antd';
import { validateFields } from '../../../utils/helper';
import { MessageError } from '../controls/MessageError';
import '../../../../assets/css/common/input.css'
import { validateEmail, validatePhoneNumber } from '../../../utils/validate';
const InputTextCommon = (props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        disabled = false,
        size,
        validate,
        setValidate,
        submittedTime
    } = props;
    const [value, setValue] = useState("");

    const onChange = (e) => {
        setValue(e.target.value || "");
        setData({
            [attribute]: e.target.value || ''
        });
    };
    let labelLower = label?.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        let checkValidate
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập đúng định dạng ${labelLower}` : "");
        }

        if (attribute.includes("email")) {
            checkValidate = validateEmail(value);
            validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? `Vui lòng nhập đúng định dạng ${labelLower}` : "");
        }
        if (attribute.includes("sdt")) {
            checkValidate = validatePhoneNumber(value);
            validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? `Vui lòng nhập đúng định dạng ${labelLower}` : "");
        }

    };
    console.log('validate1', validate);

    useEffect(() => {
        setValue(dataAttribute || '');

    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);
    return (
        <div>
            <Row className='mb-4 input-common'>
                <Col className='label' xs={24} sm={10} lg={4} xl={4}>
                    <Row justify={"start"} wrap={false}>
                        <div>{label}</div>
                        <div className='ml-1 is-required'>{isRequired ? "*" : ""} </div>
                    </Row>
                </Col>
                <Col xs={24} sm={14} lg={20} xl={20}>
                    <Input
                        size={size ? size : "middle"}
                        value={value ? value : ""}
                        onChange={onChange}
                        onBlur={() => onBlur(false)}
                        disabled={disabled}
                        placeholder={`Nhập ${label}`}
                    />
                    <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                </Col>
            </Row>
        </div>
    )
};
export default InputTextCommon;