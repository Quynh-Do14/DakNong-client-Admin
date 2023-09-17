/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Row } from 'antd';
import moment from 'moment';
import { MessageError } from '../controls/MessageError';
import { validateFields } from '../../../utils/helper';

const InputDateCommon = (props) => {
    const { label, attribute, setData, validate, setValidate, isRequired, data,
        disabled = false, dataAttribute, isText, submittedTime
    } = props;
    const [value, setValue] = useState(undefined);
    const toDay = new Date();

    // const onChange = (e) => {
    //     setValue(e.target.value || null);
    //     setData({
    //         [attribute]: e.target.value || ''
    //     });
    // }

    const disabledDate = (current) => {
        return current && current <= moment().startOf('day');
    };

    const onChange = (dateString) => {
        setValue(dateString || null);
        setData({
            [attribute]: dateString || ''
        });
    }
    let labelLower = label.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        }
    }
    useEffect(() => {
        if (dataAttribute) {
            setValue(moment(dataAttribute) || null);
        }
    }, [dataAttribute]);

    useEffect(() => {

        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);

    return (
        <Row className='mb-4 input-common'>
            <Col className='label' xs={24} sm={10} lg={4} xl={4}>
                <Row justify={"start"} wrap={false}>
                    <div>{label}</div>
                    <div className='ml-1 is-required'>{isRequired ? "*" : ""} </div>
                </Row>
            </Col>

            <Col xs={24} sm={14} lg={20} xl={20}>
                <DatePicker
                    allowClear={false}
                    size="middle"
                    className='w-100 input-date-common'
                    value={value}
                    placeholder={label}
                    // onChange={(values) => setValue(values)}
                    onChange={onChange}
                    disabledDate={disabledDate}
                    disabled={disabled}
                    format="DD/MM/YYYY"
                    onBlur={() => onBlur(false)}
                />

                <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            </Col>
        </Row>
    );

};
export default InputDateCommon;