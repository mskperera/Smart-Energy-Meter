import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import moment from 'moment';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const TodayKw = ({ days, isSearchLoading, chartFrequencty }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'kWh',
      data: [],
      backgroundColor: [],
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
      title: {
        display: true,
        text: 'Total Energy Consumption',
        color: 'white',
        font: {
          size: 13,
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataIndex = tooltipItem.dataIndex;
            const dataSourceId = days[dataIndex].dataSourceId;
            if (dataSourceId === 2) {
              return `Offline kWh: ${tooltipItem.raw}`;
            } else {
              return `kWh: ${tooltipItem.raw}`;
            }
          },
        },
      },
    },
  });

  const [totalSum, setTotalSum] = useState(0);

  const customTextPlugin = {
    id: 'customTextPlugin',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { top, right } } = chart;
      ctx.save();
      ctx.font = 'bold 13px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'right';
      ctx.fillText(`Total Energy : ${(Number(totalSum.toFixed(2))).toLocaleString()} kWh`, right - 5, top -20);
      ctx.restore();
    },
  };

  useEffect(() => {
    if (!isSearchLoading) {
      loadChartData();
    }
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
    const data = [];
    const backgroundColor = [];
    let totalSum = 0;  

    for (const e of days) {
      if (chartFrequencty === "hours") {
        data.push(e.kwhPerHour);
        labels.push(moment(e.date).format('HH'));
        backgroundColor.push(e.dataSourceId === 2 ? '#fff34661' : '#fff346');
        totalSum += e.kwhPerHour;
      } else if (chartFrequencty === "days") {
        data.push(e.kwhPerDay);
        labels.push(moment(e.date).format('DD / MMM'));
        backgroundColor.push(e.dataSourceId === 2 ? '#fff34661' : '#fff346');
        totalSum += e.kwhPerDay;
      } else if (chartFrequencty === "months") {
        data.push(e.kwhPerMonth);
        labels.push(`${months.find(m => m.number === parseInt(e.date.month)).shortName} / ${e.date.year}`);
        backgroundColor.push(e.dataSourceId === 2 ? '#fff34661' : '#fff346');
        totalSum += e.kwhPerMonth;
      } else if (chartFrequencty === "weeks") {
        data.push(e.kwhPerWeek);
        labels.push(moment(e.date).format('DD / MMM'));
        backgroundColor.push(e.dataSourceId === 2 ? '#fff34661' : '#fff346');
        totalSum += e.kwhPerWeek;
      }
    }

    setTotalSum(totalSum);

    if (totalSum > 0) {
      const datasets0 = [{
        label: "kWh",
        data: data,
        backgroundColor: backgroundColor,
        borderRadius: 5,
      }];

      setChartData({ labels: labels, datasets: datasets0 });
  
      const newOptions = {
        scales: {
          x: {
            grid: {
              display: true,
              color: '#4f4f4f',
            },
            beginAtZero: true,
            title: {
              display: true,
              text: getXAxisTitle(chartFrequencty),
              color: 'white',
              font: {
                size: 10,
              },
            },
            ticks: {
              color: 'white',
              font: {
                size: 10,
              },
            },
          },
          y: {
            grid: {
              display: true,
              color: '#4f4f4f',
            },
            beginAtZero: true,
            title: {
              display: true,
              text: "kWh",
              color: 'white',
              font: {
                size: 10,
              },
            },
            ticks: {
              color: 'white',
              font: {
                size: 10,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'start', 
            labels: {
              color: 'white',
              usePointStyle: true,
              pointStyle: 'rectRounded',
              font: {
                size: 10,
              },
            },
            onClick: () => {},
          },
          // title: {
          //   display: true,
          //   text: `Total Energy : ${(Number(totalSum.toFixed(2))).toLocaleString()} kWh`,
          //   color: 'white',
          //   font: {
          //     size: 13,
          //   }
          // },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const dataIndex = tooltipItem.dataIndex;
                const dataSourceId = days[dataIndex].dataSourceId;
                if (dataSourceId === 2) {
                  return `Offline kWh: ${tooltipItem.raw}`;
                } else {
                  return `kWh: ${tooltipItem.raw}`;
                }
              },
            },
          },
        },
      };
  
      setOptions(newOptions);
    }
  }

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

  return (
    <>
      {totalSum === 0 ? (
        <div className="no-data-message" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <h2 id='no-data'>No data Found</h2>
        </div>
      ) : (
        <Bar data={chartData} options={options} plugins={[customTextPlugin]} id='box' className='chart' />
      )}
    </>
  );
};

export default TodayKw;
