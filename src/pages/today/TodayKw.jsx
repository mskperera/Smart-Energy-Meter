import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TodayKw = ({ days, isSearchLoading, chartFrequencty }) => {

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
        return "Months";
      default:
        return "Time";
    }
  };

  const loadChartData = async () => {
    const labels = [];
    const data = [];

    for (const e of days) {
      if (chartFrequencty === "hours") {
        data.push(e.kwhPerHour);
        labels.push(e.hour);
      }
      else if (chartFrequencty === "days") {
        data.push(e.kwhPerDay);
        labels.push(e.day);
      }
      else if (chartFrequencty === "months") {
        data.push(e.kwhPerMonth);
        labels.push(e.month);
      }
    }

    const datasets0 = [{
      label: "kWh",
      data: data,
      backgroundColor: "#00ff99",
      borderWidth: 1,
    }];

    setChartData({ ...data, labels: labels, datasets: datasets0 });

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
        y: {
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
    };

    setOptions(newOptions);
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'kWh',
      data: [],
      backgroundColor: '#36A2EB',
      borderWidth: 1,
    }],
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
      y: {
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

  return (
    <Bar data={chartData} options={options} id='box' className='chart' />
  );
}

export default TodayKw;
