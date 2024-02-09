import { Box, useMediaQuery } from '@mui/material';

import Profile from './Profile';

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      {!matchesXs && <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}/>}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      {!matchesXs && <Profile />}
    </>
  );
};

export default HeaderContent;
