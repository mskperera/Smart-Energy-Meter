import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import moment from 'moment';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CombinedChart = ({ days, isSearchLoading, chartFrequency }) => {
  useEffect(() => {
    loadChartData();
  }, [isSearchLoading]);

  const getXAxisTitle = (frequency) => {
    switch (frequency) {
      case 'hours':
        return 'Hours';
      case 'days':
        return 'Days';
      case 'months':
        return 'Billing Session';
      case 'weeks':
        return 'Weeks';
      default:
        return 'Time';
    }
  };

  const loadChartData = async () => {
    const labels = [];
    const kwData = [];
    const costData = [];

    for (const e of days) {
      if (chartFrequency === 'hours') {
        kwData.push(e.kwhPerHour);
        costData.push(parseFloat(e.usageBillPerHour).toFixed(1));
        labels.push(moment(e.date).format('HH'));
      } else if (chartFrequency === 'days') {
        kwData.push(e.kwhPerDay);
        costData.push(parseFloat(e.usageBillPerDay).toFixed(1));
        labels.push(moment(e.date).format('DD / MMM'));
      } else if (chartFrequency === 'months') {
        kwData.push(e.kwhPerMonth);
        costData.push(parseFloat(e.usageBillPerMonth).toFixed(1));
        labels.push(`${months.find((m) => m.number === parseInt(e.date.month)).shortName} / ${e.date.year}`);
      } else if (chartFrequency === 'weeks') {
        kwData.push(e.kwhPerWeek);
        costData.push(parseFloat(e.usageBillPerWeek).toFixed(1));
        labels.push(moment(e.date).format('DD / MMM'));
      }
    }

    const datasets = [
      {
        label: 'kWh',
        data: kwData,
        backgroundColor: '#fff346',
        borderRadius: 5,
      },
      {
        label: 'Cost',
        data: costData,
        backgroundColor: '#4484ff',
        borderRadius: 5,
      },
    ];

    setChartData({ labels: labels, datasets: datasets });

    const newOptions = {
      scales: {
        x: {
          grid: {
            display: false,
            color: 'Gray',
          },
          beginAtZero: true,
          title: {
            display: true,
            text: getXAxisTitle(chartFrequency),
            color: 'white',
          },
          ticks: {
            color: 'white',
          },
        },
        y: {
          grid: {
            display: false,
            color: 'Gray',
          },
          beginAtZero: true,
          title: {
            display: true,
            text: 'kWh / Rs',
            color: 'white',
          },
          ticks: {
            color: 'white',
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: 'white',
            usePointStyle: true,
            pointStyle: 'rectRounded',
          },
          onClick: () => {},
        },
      },
    };

    setOptions(newOptions);
  };

  const months = [
    { shortName: 'Jan', number: 1 },
    { shortName: 'Feb', number: 2 },
    { shortName: 'Mar', number: 3 },
    { shortName: 'Apr', number: 4 },
    { shortName: 'May', number: 5 },
    { shortName: 'Jun', number: 6 },
    { shortName: 'Jul', number: 7 },
    { shortName: 'Aug', number: 8 },
    { shortName: 'Sep', number: 9 },
    { shortName: 'Oct', number: 10 },
    { shortName: 'Nov', number: 11 },
    { shortName: 'Dec', number: 12 },
  ];

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'kWh',
        data: [],
        backgroundColor: '#36A2EB',
        borderWidth: 1,
      },
      {
        label: 'Cost',
        data: [],
        backgroundColor: '#FF6384',
        borderWidth: 1,
      },
    ],
  });

  const [options, setOptions] = useState({
    scales: {
      x: {
        grid: {
          display: false,
          color: 'Gray',
        },
        beginAtZero: true,
        title: {
          display: true,
          text: 'Time',
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        grid: {
          color: 'Gray',
        },
        beginAtZero: true,
        title: {
          display: true,
          text: 'kWh / Rs',
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
        },
      },
    },
  });

  return <Bar data={chartData} options={options} id='box' className='chart' />;
};

export default CombinedChart;
