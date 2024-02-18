import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    MonitorOutlined,
    WechatOutlined
} from '@ant-design/icons';

import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    MonitorOutlined,
    WechatOutlined,
    MonitorHeartIcon
};

const prediction = {
    id: 'prediction',
    title: 'Prediction',
    type: 'group',
    children: [
        {
            id: 'predict',
            title: 'Predict Diseases',
            type: 'item',
            url: '/predict',
            icon: icons.MonitorOutlined
        },
        {
            id: 'analyseBot',
            title: 'Analyse Bot',
            type: 'item',
            url: '/analyseBot',
            icon: icons.WechatOutlined
        },
        {
            id: 'healthTracker',
            title: 'Health Tracker',
            type: 'item',
            url: '/healthTracker',
            icon: icons.MonitorHeartIcon
        },
    ]
};

export default prediction;
