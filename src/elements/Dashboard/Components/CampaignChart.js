import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const CampaignChart = ({dashboardData}) => {
  const [series, setSeries] = useState([ {name: 'Impressions',data: dashboardData.chartData ? dashboardData.chartData.chartImpr : []},
     {name: 'Clicks',data: dashboardData.chartData ? dashboardData.chartData.chartClicks : []}, ]);

  useEffect(() => {
    setSeries([ {name: 'Impressions',data: dashboardData.chartData ? dashboardData.chartData.chartImpr : []},
        {name: 'Clicks',data: dashboardData.chartData ? dashboardData.chartData.chartClicks : []}, ]);
    setOptions(prevOptions => ({
          ...prevOptions,
          xaxis: {
              ...prevOptions.xaxis,
              categories: dashboardData.chartData ? dashboardData.chartData.labels : []
          }
      }));
  },[dashboardData])

  const [options, setOptions] = useState({
    plotOptions: {
    bar: {horizontal: false,columnWidth: '30%',endingShape: 'rounded',dataLabels: {position: 'top'} },},
    chart: {type: "bar",height: 350,toolbar: { show: false, autoSelected: "pan" }},
    dataLabels: {
      enabled: true,  offsetY: -20,
      formatter: function (val) {
        return parseInt(val).toLocaleString(); // Format data labels
      }, // Adjust the vertical position of the labels
      style: {colors: ['#000000'],fontSize: '12px',fontWeight: 'bold'},
    },
    title: {
      text: "No of Impressions/Clicks",align: 'left',offsetY: 10,
      style: {fontSize: '13px',fontWeight: '600',color: '#6f7070'},
    },    
    stroke: {show: true,width: 2,colors: ['transparent']},
    xaxis: {
      categories: dashboardData.chartData ? dashboardData.chartData.labels : [],
      labels: {
        style: {
          colors: ['#000', '#000'],fontSize: '13px',fontWeight: '600'},
        rotate: -15, // Rotate labels if needed
      },
    },
    legend: {position: 'bottom',horizontalAlign: 'center',loating: false,labels: {colors: ['#000'], fontSize: '20px',fontWeight: '600'}},
    fill: {colors: ["#d2beeb", "#8042ba"],},
    tooltip: {
      y: {
        formatter: function (val) {
          return parseInt(val).toLocaleString() + " thousands";
        }
      }
    }
  });
  
  return (
    <Box className="campaign-chart"> 
        <Box className="title">Campaign Performance</Box>
        <ReactApexChart options={options} series={series} type="bar" height={320}  />
    </Box>
  );
 
};
export default CampaignChart;