import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';

import {useTheme} from '@mui/material/styles';

import ReactApexChart from 'react-apexcharts';

const areaChartOptions = {
    chart: {
        height: 450,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

const IncomeAreaChart = ({slot, usersByMonth , viewsByMonth , usersByWeek , viewsByWeek  }) => {
    const theme = useTheme();

    const {primary, secondary} = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(areaChartOptions);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const parseUserData = usersByMonth?.map(entry => {
        const {month} = entry._id;
        const monthName = monthNames[month - 1];
        return {
            monthName,
            month,
            count: entry?.count
        }
    });

    const parseViewData = viewsByMonth?.map(entry => {
        const {month} = entry._id;
        const monthName = monthNames[month - 1];
        return {
            monthName,
            month,
            count: entry?.count
        }
    })

    const parseUserDataByWeek = usersByWeek?.map(entry => {
        const {day} = entry._id;
        const monthName = weekNames[day - 2];
        return {
            monthName,
            day: day - 1,
            count: entry?.count
        }
    });

    const parseViewDataByWeek = viewsByWeek?.map(entry => {
        const {day} = entry._id;
        const monthName = weekNames[day - 2];
        return {
            monthName,
            day: day - 1,
            count: entry?.count
        }
    });

    const resultViewData = Array(monthNames.length).fill(0);
    parseViewData?.forEach(entry => {
        const {month, count} = entry;
        resultViewData[month - 1]  = count;
    });
    const resultUserData = Array(monthNames.length).fill(0);
    parseUserData?.forEach(entry => {
        const {month, count} = entry;
        resultUserData[month - 1]  = count;
    });

    const resultUserDataByWeek = Array(weekNames.length).fill(0);
    parseUserDataByWeek?.forEach(entry => {
        const {day, count} = entry;
        resultUserDataByWeek[day - 1] = count
    });

    const resultViewDataByWeek = Array(weekNames.length).fill(0);
    parseViewDataByWeek?.forEach(entry => {
        const {day, count} = entry;
        resultViewDataByWeek[day - 1] = count
    });

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.primary[700]],
            xaxis: {
                categories:
                    slot === 'month'
                        ? monthNames
                        : weekNames,
                labels: {
                    style: {
                        colors: [
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary
                        ]
                    }
                },
                axisBorder: {
                    show: true,
                    color: line
                },
                tickAmount: slot === 'month' ? 11 : 7
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            },
            tooltip: {
                theme: 'light'
            }
        }));
    }, [primary, secondary, line, theme, slot, monthNames, weekNames]);

    const [series, setSeries] = useState([
        {
            name: 'Page Views',
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: 'Total Users',
            data: [0, 0, 0, 0, 0, 0, 0]
        }
    ]);

    useEffect(() => {
        setSeries([
            {
                name: 'Page Views',
                data: slot === 'month' ? resultViewData : resultViewDataByWeek
            },
            {
                name: 'Total Users',
                data: slot === 'month' ? resultUserData : resultUserDataByWeek
            }
        ]);
    }, [resultUserData, resultUserDataByWeek, resultViewData, resultViewDataByWeek, slot]);

    return <ReactApexChart options={options} series={series} type="area" height={450}/>;
};

IncomeAreaChart.propTypes = {
    slot: PropTypes.string
};

export default IncomeAreaChart;
