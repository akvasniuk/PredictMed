import ReactApexChart from 'react-apexcharts';

import { Card, CardHeader, Box } from '@mui/material';

import { useChart } from './chart';


export default function Graph({ title, subheader, chartLabels, chartData,format,  ...other}) {
    const chartOptions = useChart({
        plotOptions: { bar: { columnWidth: '16%' } },
        fill: { type: chartData.map((i) => i.fill) },
        labels: chartLabels,
        xaxis: { type: 'datetime' },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y) => {
                    if (typeof y !== 'undefined') {
                        return `${y.toFixed(0)} ${format}`;
                    }
                    return y;
                },
            },
        },
    });

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
            </Box>
        </Card>
    );
}