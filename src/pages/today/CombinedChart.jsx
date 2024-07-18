import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import moment from 'moment';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CombinedChart = ({ days, isSearchLoading, chartFrequencty }) => {

  useEffect(() => {
    loadChartData();
  }, [isSearchLoading]);

  const getXAxisTitle = (frequency) => {
    switch (frequency) {
      case "hours":
        return "Hours";
      case "days":
        return "Days";
      case "months":
        return "Billing Session";
      case "weeks":
        return "Weeks";
      default:
        return "Time";
    }
  };

  const loadChartData = async () => {
    const labels = [];
    const kwhData = [];
    const costData = [];

    for (const e of days) {
      if (chartFrequencty === "hours") {
        kwhData.push(e.kwhPerHour);
        costData.push(parseFloat(e.usageBillPerHour).toFixed(1));
        labels.push(moment(e.date).format('HH'));
      } else if (chartFrequencty === "days") {
        kwhData.push(e.kwhPerDay);
        costData.push(parseFloat(e.usageBillPerDay).toFixed(1));
        labels.push(moment(e.date).format('DD / MMM'));
      } else if (chartFrequencty === "months") {
        kwhData.push(e.kwhPerMonth);
        costData.push(parseFloat(e.usageBillPerMonth).toFixed(1));
        labels.push(`${months.find(m => m.number === parseInt(e.date.month)).shortName} / ${e.date.year}`);
      } else if (chartFrequencty === "weeks") {
        kwhData.push(e.kwhPerWeek);
        costData.push(parseFloat(e.usageBillPerWeek).toFixed(1));
        labels.push(moment(e.date).format('DD / MMM'));
      }
    }

    const datasets = [
      {
        label: "kWh",
        data: kwhData,
        backgroundColor: "#fff346",
        yAxisID: 'y1',
        borderRadius: 5,
      },
      {
        label: "Cost",
        data: costData,
        backgroundColor: "#4484ff",
        yAxisID: 'y2',
        borderRadius: 5,
      }
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
            text: getXAxisTitle(chartFrequencty),
            color: 'white'
          },
          ticks: {
            color: 'white',
          },
        },
        y1: {
          grid: {
            display: false,
            color: 'Gray',
          },
          beginAtZero: true,
          title: {
            display: true,
            text: "kWh",
            color: 'white'
          },
          ticks: {
            color: 'white',
          },
          position: 'left',
        },
        y2: {
          grid: {
            display: false,
            color: 'Gray',
          },
          beginAtZero: true,
          title: {
            display: true,
            text: "Rs",
            color: 'white'
          },
          ticks: {
            color: 'white',
          },
          position: 'right',
        }
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
    { shortName: "Jan", number: 1 },
    { shortName: "Feb", number: 2 },
    { shortName: "Mar", number: 3 },
    { shortName: "Apr", number: 4 },
    { shortName: "May", number: 5 },
    { shortName: "Jun", number: 6 },
    { shortName: "Jul", number: 7 },
    { shortName: "Aug", number: 8 },
    { shortName: "Sep", number: 9 },
    { shortName: "Oct", number: 10 },
    { shortName: "Nov", number: 11 },
    { shortName: "Dec", number: 12 },
  ];

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
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
          text: "Time",
          color: 'white'
        },
        ticks: {
          color: 'white',
        },
      },
      y1: {
        grid: {
          color: 'Gray',
        },
        beginAtZero: true,
        title: {
          display: true,
          text: "kWh",
          color: 'white'
        },
        ticks: {
          color: 'white',
        },
        position: 'left',
      },
      y2: {
        grid: {
          color: 'Gray',
        },
        beginAtZero: true,
        title: {
          display: true,
          text: "Rs",
          color: 'white'
        },
        ticks: {
          color: 'white',
        },
        position: 'right',
      }
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

  return (
    <Bar data={chartData} options={options} id='box' className='chart' />
  );
}

export default CombinedChart;
