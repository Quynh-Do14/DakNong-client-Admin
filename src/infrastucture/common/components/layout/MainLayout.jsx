import { Breadcrumb, Button, Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined, DatabaseOutlined } from '@ant-design/icons'
import React, { useState } from 'react';
import "../../../../assets/css/MainLayout.css"
import { HeaderMainLayout } from './Header';
import { ListTourManagement } from '../../../../pages/tour-management/list';

const { Header, Sider, Content } = Layout;


export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <Layout className='layout'>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Header className='header-menu' />
          <Menu mode="inline" className='h-100'>
            <Menu.Item key="1" className='menu-title' icon={<UserOutlined />} > <a href="/User-Management">Người dùng</a> </Menu.Item>

            <Menu.Item key="2" className='menu-title' icon={<DatabaseOutlined />} > <a href="/Data-Management" >Dữ liệu người dùng</a> </Menu.Item>

            <Menu.Item key="1" className='menu-title' icon={<UserOutlined />} > <a href="/User-Management">Người dùng</a> </Menu.Item>

            <Menu.Item key="2" className='menu-title' icon={<DatabaseOutlined />} > <a href="/Data-Management" >Dữ liệu người dùng</a> </Menu.Item>

            <Menu.Item key="1" className='menu-title' icon={<UserOutlined />} > <a href="/User-Management">Người dùng</a> </Menu.Item>

            <Menu.Item key="2" className='menu-title' icon={<DatabaseOutlined />} > <a href="/Data-Management" >Dữ liệu người dùng</a> </Menu.Item>
          </Menu>

        </Sider>
        <Layout>
          <Header className='bg-white flex align-center justify-start'>
            <div
              className="btn-collap flex align-center justify-center"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </Header>
          <Content>
            <HeaderMainLayout
              title={"Danh sách sản phẩm"}
              breadcrumb={"Trang chủ"}
            />
            <div className='content'>
              <ListTourManagement />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div >
  )
}
