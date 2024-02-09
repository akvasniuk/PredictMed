import { Box, Typography } from '@mui/material';

import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import {useAuth} from '../../../../../hooks/useAuth';

const Navigation = () => {
  const {userIsAuthenticated} = useAuth();

  const navGroups = menuItem.items.filter(item =>
      userIsAuthenticated() ? item.id !== "authentication": true)
      .map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
