import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';

import ReactApexChart from 'react-apexcharts';

const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  }
};

const MonthlyBarChart = ({predictionsByWeek}) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const weekNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const parsePredictionDataByWeek = predictionsByWeek?.map(entry => {
    const {day} = entry._id;
    const weekName = weekNames[day - 2];
    return {
      weekName,
      day: day - 1,
      count: entry?.count
    }
  });

  const resultPredictionDataByWeek = Array(weekNames.length).fill(0);
  parsePredictionDataByWeek?.forEach(entry => {
    const {day, count} = entry;
    resultPredictionDataByWeek[day - 1] = count
  });

  const [series, setSeries] = useState([
    {
      data: resultPredictionDataByWeek.length > 0 && resultPredictionDataByWeek
    }
  ]);

  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    setSeries([
      {
        name: 'Disease Predictions',
        data: resultPredictionDataByWeek
      }
    ]);
  }, [predictionsByWeek]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      tooltip: {
        theme: 'light'
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, info, secondary]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </div>
  );
};

export default MonthlyBarChart;
