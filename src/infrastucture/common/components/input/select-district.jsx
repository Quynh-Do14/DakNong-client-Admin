import React, { useEffect, useState } from "react";
import { Col, Row, Select } from "antd";
import { validateFields } from '../../../utils/helper';
import { MessageError } from '../controls/MessageError';
import '../../../../assets/css/common/input.css'
import { useRecoilValue } from "recoil";
import { DistrictState } from "../../../../core/common/atoms/district/districtState";
const InputSelectDistrictCommon = (props) => {
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
    const dataDistrict = useRecoilValue(DistrictState);
    const [value, setValue] = useState("");

    const onChange = async (val) => {
        setValue(val || "");
        setData({
            [attribute]: val
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
                <Col xs={24} sm={10} lg={8} xl={6} className='title'>
                    <span>
                        <span className='label'>{label}</span>
                        <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                    </span>
                </Col>
                <Col xs={24} sm={14} lg={16} xl={18}>
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
                            dataDistrict && dataDistrict.length && dataDistrict.map((item, index) => {
                                return (
                                    <Select.Option
                                        key={index}
                                        value={item.idQuanHuyen}
                                        title={item.tenQuanHuyen}
                                    >
                                        {item.tenQuanHuyen}
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
export default InputSelectDistrictCommon;