import PropTypes from 'prop-types';
import { useState } from 'react';


import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';


import { EditOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();
    const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    switch (index){
        case 0:
            navigate('/edit')
            break;
        case 1:
            navigate('/profile')
    }
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
