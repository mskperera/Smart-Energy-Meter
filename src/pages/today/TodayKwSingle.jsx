import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import moment from 'moment';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const TodayKwSingle = ({ days, chartValueOne, chartValueTwo, chartValueThree, isSearchLoading, chartFrequencty }) => {

  // console.log('days', days);
//   console.log('chartData -- charValues', chartValueOne);
//   console.log('chartData -- charValues', chartValueTwo);
//   console.log('chartData -- charValues', chartValueThree);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
    // datasets: [{
      // label: 'kWh',
      // data: [],
      // backgroundColor: [],
      // borderWidth: 1,
      // borderColor: '#fff346', 
      // borderWidth: 2,
      // fill: true,
      // backgroundColor: 'rgba(255, 243, 70, 0.2)',
    // }],
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
          usePointStyle: true,
          pointStyle: 'line',
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
        backgroundColor: '#333', // Dark tooltip background
        titleColor: '#fff', // Tooltip title color
        bodyColor: '#fff',
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
      ctx.font = 'bold 12px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'right';
      ctx.fillText(`Total : ${(Number(totalSum.toFixed(2))).toLocaleString()} kWh`, right - 5, top -20);
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
    const datasetOneData = [];
    // const datasetTwoData = [];
    // const datasetThreeData = [];
    const dailySumData = [];
    const backgroundColor = [];
    let totalSum = 0;
  
    for (const e of days) {
      let line1 = 0;
    //    line2 = 0, line3 = 0;
  
      if (chartFrequencty === "hours") {
        labels.push(moment(e.date).format('HH'));
        line1 = chartValueOne.days.find(day => day.date === e.date)?.kwhPerHour || 0;
        // line2 = chartValueTwo.days.find(day => day.date === e.date)?.kwhPerHour || 0;
        // line3 = chartValueThree.days.find(day => day.date === e.date)?.kwhPerHour || 0;
      } else if (chartFrequencty === "days") {
        labels.push(moment(e.date).format('DD / MMM'));
        line1 = chartValueOne.days.find(day => day.date === e.date)?.kwhPerDay || 0;
        // line2 = chartValueTwo.days.find(day => day.date === e.date)?.kwhPerDay || 0;
        // line3 = chartValueThree.days.find(day => day.date === e.date)?.kwhPerDay || 0;
      } else if (chartFrequencty === "months") {
        labels.push(`${months.find(m => m.number === parseInt(e.date.month)).shortName} / ${e.date.year}`);
        line1 = chartValueOne.days.find(day => day.date === e.date)?.kwhPerMonth || 0;
        // line2 = chartValueTwo.days.find(day => day.date === e.date)?.kwhPerMonth || 0;
        // line3 = chartValueThree.days.find(day => day.date === e.date)?.kwhPerMonth || 0;
      } else if (chartFrequencty === "weeks") {
        labels.push(moment(e.date).format('DD / MMM'));
        line1 = chartValueOne.days.find(day => day.date === e.date)?.kwhPerWeek || 0;
        // line2 = chartValueTwo.days.find(day => day.date === e.date)?.kwhPerWeek || 0;
        // line3 = chartValueThree.days.find(day => day.date === e.date)?.kwhPerWeek || 0;
      }
  
      const dailyTotal = line1;
    //    + line2 + line3;
  
      datasetOneData.push(line1);
    //   datasetTwoData.push(line2);
    //   datasetThreeData.push(line3);
  
      //  daily total only if it's not null or undefined, but can be 0
     dailySumData.push(dailyTotal>0 ? Number(dailyTotal.toFixed(2)) : null);
  
      backgroundColor.push(e.dataSourceId === 2 ? '#fff34661' : '#fff346');
      totalSum += dailyTotal;
    }
  

    setTotalSum(totalSum);

    const datasets = [
      {
        label: "Line 1",
        data: datasetOneData,
        borderColor: '#FF5733', // Color for the first line
        borderWidth: 0,
        fill: false,
        backgroundColor: 'rgba(255, 87, 51, 0.9)',
        tension: 0,
      },
    //   {
    //     label: "Line 2",
    //     data: datasetTwoData,
    //     borderColor: '#33FF57', // Color for the second line
    //     borderWidth: 0,
    //     fill: false,
    //     backgroundColor: 'rgba(51, 255, 87, 0.9)',
    //     tension: 0,
    //   },
    //   {
    //     label: "Line 3",
    //     data: datasetThreeData,
    //     borderColor: '#3357FF', // Color for the third line
    //     borderWidth: 0,
    //     fill: false,
    //     backgroundColor: 'rgba(51, 87, 255, 0.9)',
    //     tension: 0,
    //   },
    //   {
    //     label: "Total",
    //     data: dailySumData,
    //     borderColor: '#FFD700',
    //     backgroundColor: 'rgba(255, 215, 0, 0.9)', // color for total sum
    //     type: 'line',
    //     tension: 0,
    //   },
    ];

    setChartData({ labels: labels, datasets: datasets });
  // };
  
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
            // onClick: () => {},
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
              afterLabel: (tooltipItem) => {
                if (chartFrequencty === "weeks") {
                  const startDate = moment(days[tooltipItem.dataIndex].date).format('DD MMM');
                  const endDate = moment(days[tooltipItem.dataIndex].date).add(6, 'days').format('DD MMM');
                  return `Week: ${startDate} - ${endDate}`;
                }
              }
            },
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

  
  return (
    <>
      {totalSum === 0 ? (
        <div className="no-data-message" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <h2 id='no-data'>No data Found</h2>
        </div>
      ) : (
        <Bar  data={chartData} options={options} plugins={[customTextPlugin]} id='box' className='chart' />
      )}
    </>
  );
};


export default TodayKwSingle;
