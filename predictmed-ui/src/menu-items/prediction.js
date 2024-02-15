import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  MonitorOutlined
} from '@ant-design/icons';


const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  MonitorOutlined
};

const prediction = {
  id: 'prediction',
  title: 'Prediction',
  type: 'group',
  children: [
    {
      id: 'predict',
      title: 'Predict diseases',
      type: 'item',
      url: '/predict',
      icon: icons.MonitorOutlined
    },
  ]
};

export default prediction;
