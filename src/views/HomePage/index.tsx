import React, { useState, useEffect, Fragment } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Layout, Button, theme } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,

  MenuFoldOutlined,
  MenuUnfoldOutlined,

} from "@ant-design/icons";
import Styles from "@/assets/styles/home.module.scss";
import { getAssetsImage } from "@/utils/global";

import MessagesView from '../messages-view.jsx';

const { Sider, Header, Content } = Layout;
const HomeIndex: React.FC = (props:any) => {

  const navigateTo = useNavigate();

  const [count, setCount] = useState(0);

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
                        navigateTo("/part1?step=1&from=A&btnStatus=up");
                      }}
                    ></Button>
                    进入任务。
                  </p>
                </h3>
              </div>
              <div className={Styles.chatView}>
                <MessagesView
                  tinode={props.tinode}
                  connected={this.state.connected}
                  ready={this.state.ready}
                  online={this.state.topicSelectedOnline}
                  acs={this.state.topicSelectedAcs}
                  displayMobile={this.state.displayMobile}
                  viewportWidth={this.state.viewportWidth}
                  viewportHeight={this.state.viewportHeight}
                  topic={this.state.topicSelected}
                  myUserId={this.state.myUserId}
                  // User public.fn.
                  myUserName={this.state.sidePanelTitle}
                  serverVersion={this.state.serverVersion}
                  serverAddress={this.state.serverAddress}
                  applicationVisible={this.state.applicationVisible}

                  forwardMessage={this.state.forwardMessage}
                  onCancelForwardMessage={this.handleHideForwardDialog}

                  callTopic={this.state.callTopic}
                  callSeq={this.state.callSeq}
                  callState={this.state.callState}
                  callAudioOnly={this.state.callAudioOnly}
                  onCallHangup={this.handleCallHangup}

                  onCallInvite={this.handleCallInvite}
                  onCallSendOffer={this.handleCallSendOffer}
                  onCallIceCandidate={this.handleCallIceCandidate}
                  onCallSendAnswer={this.handleCallSendAnswer}

                  errorText={this.state.errorText}
                  errorLevel={this.state.errorLevel}
                  errorAction={this.state.errorAction}
                  errorActionText={this.state.errorActionText}

                  newTopicParams={this.state.newTopicParams}

                  onHideMessagesView={this.handleHideMessagesView}
                  onError={this.handleError}
                  onNewTopicCreated={this.handleNewTopicCreated}
                  showContextMenu={this.handleShowContextMenu}
                  onChangePermissions={this.handleChangePermissions}
                  onNewChat={this.handleNewChatInvitation}
                  sendMessage={this.handleSendMessage}
                  onVideoCallClosed={this.handleCallClose} />

              </div>
            </div>
          )}
        </Sider>
        <Content id={Styles.contentBox}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div>
              <img src={getAssetsImage("logo.png")} width="200" alt="" />
              <h1 style={{ margin: "20px", textAlign: "center" }}>欢迎进入XXXX 测评系统</h1>
            </div>
          </div>

        </Content>
      </Layout>
    </div>
  );
};

export default HomeIndex;
