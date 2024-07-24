'use client';

import { useState, useEffect } from 'react';
import getIncomeExpense from '@/app/actions/getIncomeExpense';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale,ChartOptions, TooltipItem, BarElement, Title, Tooltip, Legend, scales } from 'chart.js';
import {  } from 'chart.js';
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ClientIncomeExpense = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const [paymentTypeData, setPaymentTypeData] = useState({});
  const [dailySpendData, setDailySpendData] = useState({});
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { income, expense, categoryBreakdown, paymentTypeBreakdown, dailySpendBreakdown } = await getIncomeExpense();
      setIncome(income ?? 0);
      setExpense(expense ?? 0);
      setCategoryData(categoryBreakdown ?? {});
      setPaymentTypeData(paymentTypeBreakdown ?? {});
      setDailySpendData(dailySpendBreakdown ?? {});
    };
    fetchData();
  }, []);

  const handleChart = () => setShowChart(!showChart);
//console.log(paymentTypeData)
  const donutData = {
    labels: Object.keys(categoryData),
    datasets: [{
      data: Object.values(categoryData),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
      ]
    }]
  };

 const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = `${context.label}` || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
            }
            return `${label}`;
          }
        }
      }
    }
  };
//console.log(chartOptions)

  const paymentTypeChartData = {
    labels: Object.keys(paymentTypeData),
    datasets: [{
      label: 'Payment Type (%)',
      data: Object.values(paymentTypeData),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }] 
  };

  // const paymentTypeChartOptions: ChartOptions<'bar'> = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   indexAxis: 'x' as const,
  //   scales: {
  //     x: {
  //       beginAtZero: true
  //     }
  //   },
  //   plugins: {
  //     tooltip: {
  //       callbacks: {
  //         label: function(context: TooltipItem<'bar'>) {
  //           let label = context.label || '';
  //           if (label) {
  //             label += ': ';
  //           }
  //           if (context.parsed.x !== null) {
  //             label += context.parsed.x.toFixed(2) + '%';
  //           }
  //           return label;
  //         }
  //       }
  //     }
  //   }
  // };
  
  const paymentTypeChartOptions = {
    ...chartOptions,
    indexAxis: 'x' as const,
    scales: {
    y: {
      display: false // This will hide the y-axis labels
    },
    x: {
      beginAtZero: true
    }
  },
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'bar'>) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += context.parsed.y.toFixed(0) + '%';
            }
            return label;
          }
        }
      }
    }
  };
  //console.log(paymentTypeChartOptions)

  const dailySpendChartData = {
    labels: Object.keys(dailySpendData),
    datasets: [{
      label: 'Daily Expenses',
      data: Object.values(dailySpendData),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }]
  };

  const donutChartOptions: ChartOptions<'doughnut'> = {
    // ...chartOptions,
    plugins: {
      legend: {
        position: 'right', // or 'bottom', 'left', 'top'
        labels: {
          boxWidth: 10,
          padding: 20
        },
      
      },
      // Remove the Y axis labels
      
    }
  };

  return (
    <>
      <div>
        <button onClick={handleChart}>{showChart ? 'Hide Charts' : 'Show Charts'}</button>
      </div>
      {showChart && (
        <div className='chart-container'>
          <Doughnut data={donutData} options={donutChartOptions} />
          <Bar data={paymentTypeChartData} options={paymentTypeChartOptions} />
          {/* <Bar data={dailySpendChartData} options={chartOptions} /> */}
        </div>
      )}
    </>
  );
};

export default ClientIncomeExpense;
