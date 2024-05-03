import React, { useState, useEffect, Fragment } from "react";
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';

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

function isUnconfirmed(acs) {
    if (acs) {
      const ex = acs.getExcessive() || '';
      return acs.isJoiner('given') && (ex.includes('R') || ex.includes('W'));
    }
    return false;
  }
  function isPeerRestricted(acs) {
    if (acs) {
      const ms = acs.getMissing() || '';
      return acs.isJoiner('want') && (ms.includes('R') || ms.includes('W'));
    }
    return false;
  }
function shouldPresentCallPanel(callState) {
    // Show call panel if either:
    // - call is outgoing (and the client is waiting for the other side to pick up) or,
    // - call is already in progress.
    return callState == CALL_STATE_OUTGOING_INITATED || callState == CALL_STATE_IN_PROGRESS;
}
class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.collapsed = false;
        this.state = Home.getDerivedStateFromProps(props, {});



    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let nextState = {};
        if (!nextProps.topic) {
            // Default state: no topic.
            nextState = {
                minSeqId: -1,
                maxSeqId: -1,
                latestClearId: -1,
                onlineSubs: [],
                topic: null,
                title: '',
                avatar: null,
                isVerified: false,
                isStaff: false,
                isDangerous: false,
                deleted: false,
                docPreview: null,
                imagePreview: null,
                imagePostview: null,
                videoPreview: null,
                videoPostview: null,
                rtcPanel: null,
                typingIndicator: false,
                scrollPosition: 0,
                fetchingMessages: false,
                peerMessagingDisabled: false,
                channel: false,
                reply: null,
                contentToEdit: null,
                showGoToLastButton: false,
                dragging: false,
                subsVersion: 0
            };
        } else if (nextProps.topic != prevState.topic) {
            const topic = nextProps.tinode.getTopic(nextProps.topic);

            nextState = {
                topic: nextProps.topic,
                deleted: topic._deleted,
                docPreview: null,
                imagePreview: null,
                imagePostview: null,
                videoPreview: null,
                videoPostview: null,
                rtcPanel: null,
                typingIndicator: false,
                scrollPosition: 0,
                fetchingMessages: false,
                showGoToLastButton: false,
                contentToEdit: null,
                dragging: false
            };

            if (nextProps.forwardMessage) {
                // We are forwarding a message. Show preview.
                nextState.reply = {
                    content: nextProps.forwardMessage.preview,
                    seq: null
                };
            } else {
                nextState.reply = null;
            }

            if (topic) {
                // Topic exists.
                const subs = [];

                if (nextProps.connected) {
                    topic.subscribers((sub) => {
                        if (sub.online && sub.user != nextProps.myUserId) {
                            subs.push(sub);
                        }
                    });
                }

                Object.assign(nextState, {
                    onlineSubs: subs
                });

                if (topic.public) {
                    Object.assign(nextState, {
                        title: topic.public.fn,
                        avatar: makeImageUrl(topic.public.photo)
                    });
                } else {
                    Object.assign(nextState, {
                        title: '',
                        avatar: null
                    });
                }

                const peer = topic.p2pPeerDesc();
                if (peer) {
                    Object.assign(nextState, {
                        peerMessagingDisabled: isPeerRestricted(peer.acs)
                    });
                } else if (prevState.peerMessagingDisabled) {
                    Object.assign(nextState, {
                        peerMessagingDisabled: false
                    });
                }
                Object.assign(nextState, {
                    minSeqId: topic.minMsgSeq(),
                    maxSeqId: topic.maxMsgSeq(),
                    latestClearId: topic.maxClearId(),
                    channel: topic.isChannelType()
                });

                if (nextProps.callTopic == topic.name && shouldPresentCallPanel(nextProps.callState)) {
                    nextState.rtcPanel = nextProps.callTopic;
                }
            } else {
                // Invalid topic.
                Object.assign(nextState, {
                    minSeqId: -1,
                    maxSeqId: -1,
                    latestClearId: -1,
                    onlineSubs: [],
                    title: '',
                    avatar: null,
                    peerMessagingDisabled: false,
                    channel: false
                });
            }
        } else {
            // We are still in same topic. Show the call panel if necessary.
            if (nextProps.callTopic == prevState.topic && !prevState.rtcPanel &&
                shouldPresentCallPanel(nextProps.callState)) {
                nextState.rtcPanel = nextProps.callTopic;
            }
        }

        if (nextProps.acs) {
            if (nextProps.acs.isWriter() != prevState.isWriter) {
                nextState.isWriter = !prevState.isWriter;
            }
            if (nextProps.acs.isReader() != prevState.isReader) {
                nextState.isReader = !prevState.isReader;
            }
            if (!nextProps.acs.isReader('given') != prevState.readingBlocked) {
                nextState.readingBlocked = !prevState.readingBlocked;
            }
            if (nextProps.acs.isSharer() != prevState.isSharer) {
                nextState.isSharer = !prevState.isSharer;
            }
        } else {
            if (prevState.isWriter) {
                nextState.isWriter = false;
            }
            if (prevState.isReader) {
                nextState.isReader = false;
            }
            if (!prevState.readingBlocked) {
                prevState.readingBlocked = true;
            }
            if (prevState.isSharer) {
                nextState.isSharer = false;
            }
        }

        if (isUnconfirmed(nextProps.acs) == !prevState.unconformed) {
            nextState.unconfirmed = !prevState.unconformed;
        }

        // Clear subscribers online when there is no connection.
        if (!nextProps.connected && prevState.onlineSubs && prevState.onlineSubs.length > 0) {
            nextState.onlineSubs = [];
        }

        return nextState;
    }


    render() {
        <div>
            123
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
                    collapsed={this.collapsed}
                    trigger={null}
                    onCollapse={(value) => this.collapsed = value}
                    width={260}
                    className={Styles.homeSider}
                >
                    {this.collapsed ? (
                        <Button
                            type="text"
                            icon={<MenuUnfoldOutlined />}
                            onClick={() => this.collapsed = !this.collapsed}
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
                                    tinode={this.props.tinode}
                                    connected={this.props.connected}
                                    ready={this.props.ready}
                                    online={this.props.topicSelectedOnline}
                                    acs={this.props.topicSelectedAcs}
                                    displayMobile={this.props.displayMobile}
                                    viewportWidth={this.props.viewportWidth}
                                    viewportHeight={this.props.viewportHeight}
                                    topic={this.props.topicSelected}
                                    myUserId={this.props.myUserId}

                                    myUserName={this.props.sidePanelTitle}
                                    serverVersion={this.props.serverVersion}
                                    serverAddress={this.props.serverAddress}
                                    applicationVisible={this.props.applicationVisible}

                                    forwardMessage={this.props.forwardMessage}
                                    onCancelForwardMessage={this.props.handleHideForwardDialog}

                                    callTopic={this.props.callTopic}
                                    callSeq={this.props.callSeq}
                                    callState={this.props.callState}
                                    callAudioOnly={this.props.callAudioOnly}
                                    onCallHangup={this.props.handleCallHangup}

                                    onCallInvite={this.props.handleCallInvite}
                                    onCallSendOffer={this.props.handleCallSendOffer}
                                    onCallIceCandidate={this.props.handleCallIceCandidate}
                                    onCallSendAnswer={this.props.handleCallSendAnswer}

                                    errorText={this.props.errorText}
                                    errorLevel={this.props.errorLevel}
                                    errorAction={this.props.errorAction}
                                    errorActionText={this.props.errorActionText}

                                    newTopicParams={this.props.newTopicParams}

                                    onHideMessagesView={this.props.handleHideMessagesView}
                                    onError={this.props.handleError}
                                    onNewTopicCreated={this.props.handleNewTopicCreated}
                                    showContextMenu={this.props.handleShowContextMenu}
                                    onChangePermissions={this.props.handleChangePermissions}
                                    onNewChat={this.props.handleNewChatInvitation}
                                    sendMessage={this.props.handleSendMessage}
                                    onVideoCallClosed={this.props.handleCallClose}
                                />

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
    }
};

export default Home;