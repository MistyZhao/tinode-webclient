import React, { useState, useEffect, Fragment } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Layout, Button, theme } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ExclamationCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Styles from "@/assets/styles/home.module.scss";

const { Sider, Header, Content } = Layout;
const HomeIndex: React.FC = () => {
 
  // const navigateTo = useNavigate();

  // 侧边栏折叠或收起状态
  const [collapsed, setCollapsed] = useState(false);

  

  return (
    <div>
      <Header id={Styles.header} >
        <div className={Styles.headerBox}>
        <h1 className={Styles.topTitle}>Introduce</h1>
        <div className={Styles.processBtns}>
          <Button
            icon={<ArrowLeftOutlined />}
            disabled
            className={Styles.arrowBtnLeft}
          ></Button>
          {/* 暂时以 A 端（花花）视角实现 */}
          <Button
            icon={<ArrowRightOutlined />}
            className={Styles.arrowBtnRight}
            onClick={() => {
              navigateTo("/part1?step=1&from=A");
            }}
          ></Button>
        </div>
        </div>
       
      </Header>

      <Layout className={Styles.homeBox}>
        {/* 左侧边栏 */}
        <Sider
          collapsible
          collapsedWidth="40"
          collapsed={collapsed}
          trigger={null}
          onCollapse={(value) => setCollapsed(value)}
          width={260}
          className={Styles.homeSider}
        >
          {collapsed ? (
            <Button
              type="text"
              icon={<MenuUnfoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className={Styles.unfoldBtn}
            />
          ) : (
            <div>
              <Button
                type="text"
                icon={<MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className={Styles.foldBtn}
              />
              <div className={Styles.subjectView}>
                {/* Loginview / SubjectView */}

                <h3 className={Styles.subjectText}>
                  大熊猫花花和她的弟弟叶叶住在同一个笼子。花花是一只生长发育比较慢的大熊猫，而她的双胞胎弟弟叶叶则十分健壮。饲养员与他们玩了一次抢食游戏。
                  <p>
                    您和您的队友需要分别扮演花花和叶叶进行一系列决策。 请单击{" "}
                    <Button
                      icon={<ArrowRightOutlined />}
                      className={Styles.arrowBtnRight}
                      onClick={() => {
                        navigateTo("/part1?step=1&from=A");
                      }}
                    ></Button>
                    进入任务。
                  </p>
                </h3>
              </div>
              <div className={Styles.chatView}>
                <h2>聊天区域</h2>
              </div>
            </div>
          )}
        </Sider>
        <Content id={Styles.contentBox}></Content>
      </Layout>
    </div>
  );
};

export default HomeIndex;
