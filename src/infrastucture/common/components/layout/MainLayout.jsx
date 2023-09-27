import { Layout, Menu, Row, Col } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import "../../../../assets/css/MainLayout.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../../core/common/appRouter';
import { FullPageLoading } from '../controls/loading';
import DialogConfirmCommon from '../modal/dialogConfirm';
import avatar from "../../../../assets/images/avatar.png"
import Constants from '../../../../core/common/constant';
import logo from "../../../../assets/images/logo.png"
import api from '../../../api';
import { useRecoilState } from 'recoil';
import { CategoryState } from '../../../../core/common/atoms/category/categoryState';
import { DistrictState } from '../../../../core/common/atoms/district/districtState';
const { Header, Sider } = Layout;


export const MainLayout = ({ ...props }) => {
  // const { title, breadcrumb, redirect } = props
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenModalLogout, setIsOpenModalLogout] = useState(false);

  const [dataCategory, setDataCategory] = useRecoilState(CategoryState);
  const [dataDistrict, setDataDistrict] = useRecoilState(DistrictState);

  const navigate = useNavigate();
  const location = useLocation();
  const onLogout = () => {
    sessionStorage.clear();
    navigate(ROUTE_PATH.LOGIN);
  }
  const openModalLogout = () => {
    setIsOpenModalLogout(true);
  };

  const closeModalLogout = () => {
    setIsOpenModalLogout(false);
  };

  const onGetListCategoryAsync = async () => {
    const response = await api.getAllCategory(
      "",
      () => { }
    )
    if (response.data.danhMucs?.length > 0) {
      setDataCategory(response.data.danhMucs);
    }
  };

  useEffect(() => {
    onGetListCategoryAsync();
  }, [])

  const onGetListDistrictAsync = async () => {
    const response = await api.getAllDistrict(
      "",
      () => { }
    )
    if (response.data.quanHuyens?.length > 0) {
      setDataDistrict(response.data.quanHuyens);
    }
  };

  useEffect(() => {
    onGetListDistrictAsync();
  }, []);

  return (
    <div className="main-layout">
      {/* <Layout className='layout'>

        <Layout >
          <Content className='flex flex-col'>

            {props.children}
          </Content>
        </Layout>
      </Layout> */}
      <Sider className='sider' trigger={null} collapsible collapsed={collapsed}>
        <div className='header-menu'>
          <img src={logo} alt="" width={180} height={50} />
        </div>
        <Menu mode="inline" className='container-menu h-100'>
          {Constants.Menu.List.map((it, index) => {
            return (
              <Menu.Item className={`${location.pathname.includes(it.link) ? "menu-title active" : "menu-title"}`} key={index} icon={it.icon}>
                <Link to={it.link}>
                  {it.label}
                </Link>
              </Menu.Item>
            )
          })}
        </Menu>

      </Sider>
      <div className="content-layout">
        <Header className='bg-white header-layout'>
          <Row justify={"space-between"} align={"middle"}>
            <Col
              className="btn-collap flex align-center justify-center pointer"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Col>
            <Col>
              <Row gutter={20} align={"middle"}>
                <Col>
                  <Row onClick={openModalLogout} className='logout pointer'>
                    <Col><LogoutOutlined /></Col>
                    <Col className='ml-2'>Đăng xuất</Col>
                  </Row>
                </Col>

                <Col className='flex'>
                  <img className='avatar pointer' src={avatar} alt="" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
        {props.children}
      </div>
      <DialogConfirmCommon
        message={"Bạn có muốn đăng xuất khỏi hệ thống"}
        titleCancel={"Bỏ qua"}
        titleOk={"Đăng xuất"}
        visible={isOpenModalLogout}
        handleCancel={closeModalLogout}
        handleOk={onLogout}
        title={"Xác nhận"}
      />
      <FullPageLoading isLoading={loading} />
    </div >
  )
}
