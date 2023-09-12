import { Breadcrumb } from 'antd';
import React from 'react'
import "../../../../assets/css/HeaderMainLayout.css";
export const HeaderMainLayout = (props) => {
  const { title, breadcrumb } = props;
  return (
    <div>
      <div className='header-main-layout bg-white w-100'>
        <h1 className='title'>{title}</h1>
        <Breadcrumb>
          <Breadcrumb.Item className='breadcumb'>{breadcrumb}</Breadcrumb.Item>
          <Breadcrumb.Item className='breadcumb-title'>{title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  )
}
