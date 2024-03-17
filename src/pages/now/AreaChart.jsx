import React from 'react'
import Chart from 'react-apexcharts';



const AreaChart = () => {
  const options = {
      chart: {
          type: 'area',
      },
      series: [{
          name: 'kWh',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }],
      xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 9, 10]
      }
  };

  return (
      <div>
          <Chart options={options} series={options.series} type="area" id='box2' className="chart2" width={500} />
      </div>
  );
};

export default AreaChart;