import React from 'react'
import { Link } from "react-router-dom";
import { Menu, Image } from 'antd'
import styles from '../../styles/styles'
import { AimOutlined } from '@ant-design/icons'


function Navbar() {
    return (
        <>
            <Menu
                theme='dark'
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                style={{ lineHeight: '74px' }}
                className="menu"
                breakpoint="lg"
                collapsedWidth="0">
                <Menu.Item key="1" style={styles.navRight}>Self Report
                  <Link to="/selfReport" />
                </Menu.Item>
                <Menu.Item key="2" style={styles.navRight}>Map
                  <Link to="/map" /></Menu.Item>
                <Menu.Item key="3" style={styles.navRight}>Home
                  <Link to="/" /></Menu.Item>
            </Menu>
            <Image style={styles.logo} 
                  preview={false} width='90px' 
                  size = 'large' 
                  src='/logo-dark.jpg'>
            </Image>
            <div style={styles.alert}>
            <AimOutlined style={styles.alertIcon} />
              There are 3 confirmed cases found 500 meters to your current location! Please be aware!</div>
        </>
    )
}

export default Navbar
