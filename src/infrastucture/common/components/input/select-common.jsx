import React, { useEffect, useState } from "react";
import { Col, Row, Select } from "antd";
import { validateFields } from '../../../utils/helper';
import { MessageError } from '../controls/MessageError';
import '../../../../assets/css/common/input.css'
const InputSelectCommon = (props) => {
    const {
        dataAttribute,
        setData,
        attribute,
        disabled,
        listDataOfItem,
        setValidate,
        validate,
        submittedTime,
        isRequired,
        label
    } = props;

    const [value, setValue] = useState("");




    const onChange = async (val) => {
        setValue(val || "");
        setData((prev) => {
            prev[attribute] = val;
            return [...prev]
        });
    };

    let labelLower = label.toLowerCase();
    const validateBlur = (isImplicitChange = false) => {
        validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập đúng định dạng ${labelLower}` : "");
    };

    const onBlur = () => {
        validateBlur(false);
    };

    useEffect(() => {
        if (dataAttribute) {
            setValue(dataAttribute);
        }
    }, [dataAttribute]);


    useEffect(() => {
        if (submittedTime != null) {
            validateBlur(true);
        }
    }, [submittedTime]);

    return (
        <div>
            <Row className='mb-4 select-common'>
                <Col className='label' xs={24} sm={10} lg={4} xl={4}>
                    <Row justify={"start"} wrap={false}>
                        <div>{label}</div>
                        <div className='ml-1 is-required'>{isRequired ? "*" : ""} </div>
                    </Row>
                </Col>
                <Col xs={24} sm={14} lg={20} xl={20}>
                    <Select
                        showSearch
                        allowClear={false}
                        showArrow
                        className="w-100"
                        disabled={disabled}
                        value={value}
                        listHeight={120}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={`Chọn ${label}`}
                        getPopupContainer={trigger => trigger.parentNode}
                    >
                        {
                            listDataOfItem && listDataOfItem.length && listDataOfItem.map((item, index) => {
                                return (
                                    <Select.Option
                                        key={index}
                                        value={item.value}
                                        title={item.label}
                                    >
                                        {item.label}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                    <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                </Col>
            </Row>
        </div>
    );
}
export default InputSelectCommon;