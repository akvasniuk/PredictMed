import {useEffect, useState} from 'react';

import {Box, Button, Grid, Stack, Typography} from '@mui/material';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import {statisticsService} from "../../services";

const Home = () => {
  const [slot, setSlot] = useState('week');
  const [userStatistics, setUserStatistics] = useState();
  const [viewStatistics, setViewStatistics] = useState();
  const [usersByMonth, setUsersByMonth] = useState();
  const [viewsByMonth, setViewsByMonth] = useState();
  const [usersByWeek, setUsersByWeek] = useState();
  const [viewsByWeek, setViewsByWeek] = useState();


  const chooseColorOnPercentage = (percentage) => {
    let color;

    if(percentage > 50 && percentage < 25){
      color = "warning";
    }else if(percentage < 25){
      color = "error";
    }
    return color;
  }

  useEffect(() => {
    const getUserStatistic = async () => {
      try {
        const response = await statisticsService.getNumberOfUsers();
        setUserStatistics(response?.data);
      }catch (e){
        console.log(e);
      }
    }

    const getViewStatistic = async () => {
      try {
        const response = await statisticsService.getNumberOfViews();
        setViewStatistics(response?.data);
      }catch (e){
        console.log(e);
      }
    }

    const setView = async () => {
      try {
        await statisticsService.setView();
      }catch (e){
        console.log(e);
      }
    }

    const getNumberOfUsersByMonth = async () => {
      try {
        const response = await statisticsService.getNumberOfUsersByMonth();
        setUsersByMonth(response?.data);
      }catch (e){
        console.log(e);
      }
    }

    const getNumberOfViewsByMonth = async () => {
      try {
        const response = await statisticsService.getNumberOfViewsByMonth();
        setViewsByMonth(response?.data);
      }catch (e) {
        console.log(e);
      }
    }

    const getNumberOfUsersByWeek = async () => {
      try {
        const response = await statisticsService.getNumberOfUsersByWeek();
        setUsersByWeek(response?.data);
      }catch (e){
        console.log(e);
      }
    }

    const getNumberOfViewsByWeek = async () => {
      try {
        const response = await statisticsService.getNumberOfViewsByWeek();
        setViewsByWeek(response?.data);
      }catch (e){
        console.log(e);
      }
    }

    setView();
    getUserStatistic();
    getViewStatistic();
    getNumberOfUsersByMonth();
    getNumberOfViewsByMonth();
    getNumberOfUsersByWeek();
    getNumberOfViewsByWeek();
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Page Views" color={chooseColorOnPercentage(userStatistics?.percentage)} count={viewStatistics?.totalViews}
                           percentage={viewStatistics?.percentage.toFixed(2)} extra={viewStatistics?.totalNewViews} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Users" color={chooseColorOnPercentage(userStatistics?.percentage)} count={userStatistics?.totalUsers}
                           percentage={userStatistics?.percentage.toFixed(2)} extra={userStatistics?.totalNewUsers} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Disease Analysis" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Disease Prediction" count="35,078" percentage={27.4} isLoss color="warning" extra="20,395" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Unique Users</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Week
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart slot={slot}  usersByMonth = {usersByMonth} viewsByMonth = {viewsByMonth}
                             usersByWeek = {usersByWeek} viewsByWeek = {viewsByWeek} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Disease Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Week Statistics
              </Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Home;
