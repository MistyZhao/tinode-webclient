import { ThemeConfig } from 'antd';

export const antThemeConfig: ThemeConfig = {
    // 主题算法(默认/暗黑/紧凑)
    // algorithm: theme.defaultAlgorithm,
    token: {
        colorPrimary: '#384989',
        boxShadow: 'none',
        controlHeight: 36,
        borderRadius: 4,
    },
    components: {
        Input: {},
        Button: {
            defaultHoverBorderColor: '#384989',
            defaultHoverColor: '#333',
            defaultShadow: 'none',
            colorPrimaryHover: '#12215B',
            primaryShadow: 'none',
        },
        Menu: {
            itemHoverBg: 'rgba(56, 73, 137, 0.1)',
        },
    },
};
