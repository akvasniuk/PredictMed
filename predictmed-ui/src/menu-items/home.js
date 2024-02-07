import { DashboardOutlined, HomeOutlined } from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  HomeOutlined
};

const home = {
  id: 'group-home',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/home',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    }
  ]
};

export default home;
