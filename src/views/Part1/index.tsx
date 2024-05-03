import React, { useState, useEffect, Fragment } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";

import { Layout, Button, theme } from "antd";

import { getAssetsImage} from "@/utils/global";
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
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step");
  const from = searchParams.get("from");
  const btnStatus = searchParams.get("btnStatus");
  // 侧边栏折叠或收起状态
  const [collapsed, setCollapsed] = useState(false);

  let seconds = 30;
  let gameStatus = false;
  let timer: any = null;

  const handleNext = () => {
    if (!gameStatus && seconds > 0) {
      startTimer();
    } else {
      navigateTo("/part1?step=2&from=A");
    }
  };
  const startTimer = () => {
    gameStatus = true;
    timer = setInterval(() => {
      --seconds;
      if (seconds == 0) {
        clearInterval(timer);
      }
    }, 1000);
  };
  return (
    <div>
      <Header id={Styles.header}>
        <div className={Styles.headerBox}>
          <h1 className={Styles.topTitle}>Part 1</h1>
          <div className={Styles.processBtns}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => {
                navigateTo(-1);
              }}
              className={Styles.arrowBtnLeft}
            ></Button>
            {/* 暂时以 A 端（花花）视角实现 */}
            <Button
              icon={<ArrowRightOutlined />}
              className={Styles.arrowBtnRight}
              onClick={() => {
                handleNext();
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

                <h3
                  className={Styles.subjectText}
                  style={{ textIndent: "0", paddingTop: "12px" }}
                >
                  任务说明：
                </h3>

                <p style={{ textIndent: "2rem" }}>
                  在此任务中，你和你的队友需要使花花和叶叶所得的能量
                  <strong>总量</strong>
                  尽可能多，与此同时双方各自得到的能量也尽可能多。计分方式：总得分=（花花能量+叶叶能量）-|花花能量-叶叶能量|。一共进行20次投食。你负责决定
                  {from == "A" ? <strong>花花</strong> : <strong>叶叶</strong>}
                  的运动方向，每次投食前有30秒时间决定。
                </p>
                {!gameStatus && seconds > 0 ? (
                  <p>
                    请单击
                    <Button
                      icon={<ArrowRightOutlined />}
                      className={Styles.arrowBtnRight}
                      onClick={() => {
                        handleNext();
                      }}
                    ></Button>
                    开始计时
                  </p>
                ) : null}
              </div>
              <div className={Styles.chatView}>
                <h2>聊天区域</h2>
              </div>
            </div>
          )}
        </Sider>
        <Content id={Styles.contentBox}>
          <div className={Styles.part1}>
            {gameStatus ? <p className={Styles.seconds}>{seconds}</p> : null}

            <div className={Styles.resultBox}>
              <span>花花能量值：<strong>0</strong></span>
              <span>叶叶能量值：<strong>0</strong></span>
            </div>

            <div className={Styles.imgBox}>
             
                <img src={getAssetsImage("pipe.png")} className={Styles.pipe}alt="" />
              
             
                <img src={getAssetsImage("panda_huahua.png")} className={Styles.huahua} alt="" />
              
             
                <img src={getAssetsImage("panda_yeye.png")}  className={Styles.yeye}alt="" />
             
              
                <img
                  src={
                    btnStatus != "on"
                      ? getAssetsImage("buttonup.png")
                      : getAssetsImage('buttondown.png')
                  }
                  alt=""
                  className={Styles.btn}
                />
              
            </div>

            <div className={Styles.btnBox}>
              <Button>按键</Button>
              <Button>不动</Button>
              {step == '2' ? <Button>按键不回</Button> : null}
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default HomeIndex;
