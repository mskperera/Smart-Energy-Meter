import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import moment from 'moment';
import { type } from '@testing-library/user-event/dist/type';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TodayCost = ({ days,chartValueOne, chartValueTwo, chartValueThree, isSearchLoading, chartFrequencty }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
    // datasets: [{
    //   label: 'Cost',
    //   data: [],
    //   backgroundColor: [],
    //   borderWidth: 1,
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
          font: {
            size: 10,
          },
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
          text: "Rs",
          color: 'white',
          // font: {
          //   size: 12,
          // },
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
        labels: {
          color: 'white',
          usePointStyle: true,
          pointStyle: 'line',
        },
      },
      title: {
        display: true,
        text: 'Total Cost Consumption',
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
              return `Offline Cost: ${tooltipItem.raw} Rs`;
            }else {
              return `Cost: ${tooltipItem.raw} Rs`;
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
      ctx.fillText(`Total Rs : ${(Number(totalSum.toFixed(2))).toLocaleString()}`, right -5 , top - 20);
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
    // const data = [];
    const datasetOneData = [];
    const datasetTwoData = [];
    const datasetThreeData = [];
    const dailySumData = [];
    const backgroundColor = [];
    let totalSum = 0;

    for (const e of days) {

      let line1 =0, line2 =0, line3 =0;

      if (chartFrequencty === "hours") {
        labels.push(moment(e.date).format('HH'));
        line1 = chartValueOne.days.find(day => day.date === e.date)?.usageBillPerHour || 0;
        line2 = chartValueTwo.days.find(day => day.date === e.date)?.usageBillPerHour || 0;
        line3 = chartValueThree.days.find(day => day.date === e.date)?.usageBillPerHour || 0;
        // data.push(parseFloat(e.usageBillPerHour).toFixed(1));
        // labels.push(moment(e.date).format('HH'));
        // totalSum += e.usageBillPerHour;
        // backgroundColors.push(e.dataSourceId === 2 ? '#4486ff61' : '#4484ff');
        // datasetOneData.push(chartValueOne.days.find(day => day.date === e.date)?.usageBillPerHour || 0);
        // datasetTwoData.push(chartValueTwo.days.find(day => day.date === e.date)?.usageBillPerHour || 0);
        // datasetThreeData.push(chartValueThree.days.find(day => day.date === e.date)?.usageBillPerHour || 0);
        // backgroundColor.push(e.dataSourceId === 2 ? '#fff34661' : '#fff346');
        // totalSum += e.kwhPerHour;
        // totalSum += (datasetOneData[datasetOneData.length - 1] + datasetTwoData[datasetTwoData.length - 1] + datasetThreeData[datasetThreeData.length - 1]);
      }
      else if (chartFrequencty === "days") {
        labels.push(moment(e.date).format('DD / MMM'));
        line1 = chartValueOne.days.find(day => day.date === e.date)?.usageBillPerDay || 0;
        line2 = chartValueTwo.days.find(day => day.date === e.date)?.usageBillPerDay || 0;
        line3 = chartValueThree.days.find(day => day.date === e.date)?.usageBillPerDay || 0;
        // data.push(parseFloat(e.usageBillPerDay).toFixed(1));
        // labels.push(moment(e.date).format('DD / MMM'));
        // totalSum += e.usageBillPerDay;
        // backgroundColors.push(e.dataSourceId === 2 ? '#4486ff61' : '#4484ff');
        // labels.push(moment(e.date).format('DD / MMM'));
        // datasetOneData.push(chartValueOne.days.find(day => day.date === e.date)?.usageBillPerDay || 0);
        // datasetTwoData.push(chartValueTwo.days.find(day => day.date === e.date)?.usageBillPerDay || 0);
        // datasetThreeData.push(chartValueThree.days.find(day => day.date === e.date)?.usageBillPerDay || 0);
        // backgroundColor.push(e.dataSourceId === 2 ? '#fff34661' : '#fff346');
        // totalSum += e.kwhPerDay;
        // totalSum += (datasetOneData[datasetOneData.length - 1] + datasetTwoData[datasetTwoData.length - 1] + datasetThreeData[datasetThreeData.length - 1]);
      }
      else if (chartFrequencty === "months") {
        labels.push(`${months.find(m => m.number === parseInt(e.date.month)).shortName} / ${e.date.year}`);
        line1 = chartValueOne.days.find(day => day.date === e.date)?.usageBillPerMonth || 0;
        line2 = chartValueTwo.days.find(day => day.date === e.date)?.usageBillPerMonth || 0;
        line3 = chartValueThree.days.find(day => day.date === e.date)?.usageBillPerMonth || 0;
        // data.push(parseFloat(e.usageBillPerMonth).toFixed(1));
        // labels.push(`${months.find(m => m.number === parseInt(e.date.month)).shortName} / ${e.date.year}`);
        // totalSum += e.usageBillPerMonth;
        // backgroundColors.push(e.dataSourceId === 2 ? '#4486ff61' : '#4484ff');
        // labels.push(`${months.find(m => m.number === parseInt(e.date.month)).shortName} / ${e.date.year}`);
        // datasetOneData.push(chartValueOne.days.find(day => day.date === e.date)?.usageBillPerMonth || 0);
        // datasetTwoData.push(chartValueTwo.days.find(day => day.date === e.date)?.usageBillPerMonth || 0);
        // datasetThreeData.push(chartValueThree.days.find(day => day.date === e.date)?.usageBillPerMonth || 0);
        // backgroundColor.push(e.dataSourceId === 2 ? '#fff34661' : '#fff346');
        // totalSum += e.kwhPerMonth;
        // totalSum += (datasetOneData[datasetOneData.length - 1] + datasetTwoData[datasetTwoData.length - 1] + datasetThreeData[datasetThreeData.length - 1]);
      }
      else if (chartFrequencty === "weeks") {
        labels.push(moment(e.date).format('DD / MMM'));
        line1 = chartValueOne.days.find(day => day.date === e.date)?.usageBillPerWeek || 0;
        line2 = chartValueTwo.days.find(day => day.date === e.date)?.usageBillPerWeek || 0;
        line3 = chartValueThree.days.find(day => day.date === e.date)?.usageBillPerWeek || 0;
        // data.push(parseFloat(e.usageBillPerWeek).toFixed(1));
        // labels.push(moment(e.date).format('DD / MMM'));
        // totalSum += e.usageBillPerWeek;
        // backgroundColors.push(e.dataSourceId === 2 ? '#4486ff61' : '#4484ff');
        // labels.push(moment(e.date).format('DD / MMM'));
        // datasetOneData.push(chartValueOne.days.find(day => day.date === e.date)?.usageBillPerWeek || 0);
        // datasetTwoData.push(chartValueTwo.days.find(day => day.date === e.date)?.usageBillPerWeek || 0);
        // datasetThreeData.push(chartValueThree.days.find(day => day.date === e.date)?.usageBillPerWeek || 0);
        // backgroundColor.push(e.dataSourceId === 2 ? '#fff34661' : '#fff346');
        // totalSum += e.kwhPerWeek;
        // totalSum += (datasetOneData[datasetOneData.length - 1] + datasetTwoData[datasetTwoData.length - 1] + datasetThreeData[datasetThreeData.length - 1]);
      
      }

      const dailyTotal = line1 + line2 + line3;
      datasetOneData.push(line1);
      datasetTwoData.push(line2);
      datasetThreeData.push(line3);

      dailySumData.push(dailyTotal > 0 ? Number(dailyTotal.toFixed(2)) : null);

      backgroundColor.push(e.dataSourceId === 2 ? '#4486ff61' : '#4484ff');
      totalSum += dailyTotal;
    }

    setTotalSum(totalSum);

    // if (totalSum > 0) {
    //   const datasets0 = [{
    //     label: "Cost",
    //     data: data,
    //     // backgroundColor: backgroundColors,
    //     // borderRadius: 5,
    //     backgroundColor: 'rgba(68, 132, 255, 0.2)', // Transparent fill for line
    //     borderColor: '#4484ff', // Line color
    //     pointBackgroundColor: 'rgba(68, 132, 255, 0.2)', // White point fill
    //     pointBorderColor: '#4484ff', // Point border
    //     pointHoverBackgroundColor: '#4484ff', // Hovered point fill
    //     pointHoverBorderColor: '#ffffff', // Hovered point border
    //     borderWidth: 2,
    //     tension: 0.4, // Smooth line curve
    //     fill: true,
    //   }];

    //   setChartData({ labels: labels, datasets: datasets0 });

    const datasets = [
      {
        label: "Line 1",
        data: datasetOneData,
        borderColor: '#FF5733', // Color for the first line
        borderWidth: 0,
        fill: false,
        backgroundColor: 'rgba(255, 87, 51, 0.9)', // Hovered point border
        // borderWidth: 2,
        tension: 0, // Smooth line curve
        // fill: true,
      },
      {
        label: "Line 2",
        data: datasetTwoData,
        borderColor: '#33FF57', // Color for the second line
        borderWidth: 0,
        fill: false,
        backgroundColor: 'rgba(51, 255, 87, 0.9)',
        tension: 0, // Smooth line curve
        // fill: true,
      },
      {
        label: "Line 3",
        data: datasetThreeData,
        borderColor: '#3357FF', // Color for the third line
        borderWidth: 0,
        fill: false,
        backgroundColor: 'rgba(51, 87, 255, 0.9)',
        tension: 0, // Smooth line curve
        // fill: true,
      },
      {
        label: "Total",
        data: dailySumData,
        borderColor: '#FF33FF', // Color for the third line
        // borderWidth: 0,
        // fill: false,
        type: 'line',
        backgroundColor: 'rgba(255, 51, 255, 0.9)',
        tension: 0, // Smooth line curve
        // fill: true,
      },
    ];

    setChartData({ labels: labels, datasets: datasets });

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
              text: "Rs",
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
            // onClick: () => { },
          },
          // title: {
          //   display: true,
          //   text: `Total Cost Rs : ${(Number(totalSum.toFixed(2))).toLocaleString()} `,
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
                const value = tooltipItem.raw.toFixed(2);
                if (dataSourceId === 2) {
                  return `Offline Rs: ${value}`;
                } else {
                  return `Rs: ${value}`;
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
    // }
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
}

export default TodayCost;
