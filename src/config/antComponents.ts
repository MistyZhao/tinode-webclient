import { ConfigProviderProps } from 'antd/es/config-provider';
import zhCN from 'antd/locale/zh_CN';

/*
 * 组件行为全局配置,参考文档:
 * https://ant-design.antgroup.com/components/config-provider-cn
 */
export const antCompConfig: ConfigProviderProps = {
    input: {
        autoComplete: 'off',
    },
    locale: zhCN,
    getPopupContainer: (trigger) => trigger?.parentElement || document.body,
};
