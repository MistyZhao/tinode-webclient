import React from 'react';
import { createRoot } from 'react-dom/client';

// 路由
import { BrowserRouter } from 'react-router-dom';

// 状态管理


// 公共样式
import '@/assets/styles/global.scss';
import '@/assets/styles/tailwind.css';

import { ConfigProvider } from 'antd';
// import { antCompConfig, antThemeConfig } from '@/config';
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
    
            <BrowserRouter>
                <StyleProvider hashPriority='high' transformers={[legacyLogicalPropertiesTransformer]}>
                {/* theme={antThemeConfig} {...antCompConfig} */}
                    <ConfigProvider >
                        <div className='App' id='app'>
                            <App />
                        </div>
                    </ConfigProvider>
                </StyleProvider>
            </BrowserRouter>
       ,
);
