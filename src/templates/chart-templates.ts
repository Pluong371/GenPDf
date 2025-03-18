import { processDataChart } from "../utils/utils";
const QuickChart = require("quickchart-js");

export const ChartOutlabeledPie = (data: any) => {
  const ChartOutlabeledPie = new QuickChart();
  const processedData = processDataChart(data);

  const chartConfig = {
    type: "outlabeledPie",
    data: {
      labels: processedData.map((item: any) => item.label),
      datasets: [
        {
          label: "Ownership Distribution",
          data: processedData.map((item: any) => item.value),
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#ffce56",
            "#4bc0c0",
            "#9966ff",
            "#ff9f40",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom",
        align: 'center',    
        labels: {
          usePointStyle: true, 
          boxWidth: 12,       
          padding: 8,      
          fontSize: 8,        
          fontColor: '#666'    
        },
      },
      layout: {
        padding: {
          top: 0,   
          bottom: 0, 
          left: 10,  
          right: 10
        }
      },
      plugins: {
        outlabels: {
          text: '%l %p',
          color: 'white',
          stretch: 35,
          font: {
            resizable: true,
            minSize: 8,
            maxSize: 12,
          },
        },
      
        // datalabels: {
        //   display: (context: any) => {
        //     const value = context.dataset.data[context.dataIndex];
        //     return value > 0; 
        //   },
        //   color: '#5b81ac',
        //   formatter: (value: any, ctx: any) => {
        //     const label = ctx.chart.data.labels[ctx.dataIndex];
        //     const percentage = Math.round(value * 10) / 10;
        //     return `${label}: ${percentage}%`;
        //   },
        //   align: 'end',
        //   anchor: 'end',
        //   offset: 10,
        //   font: {
        //     weight: 'bold',
        //     size: 11
        //   }
        // }
      },
    },
  };

  ChartOutlabeledPie
    .setConfig(chartConfig)
    .setWidth(400)
    .setHeight(300)
    .setBackgroundColor("white");

  return ChartOutlabeledPie.getUrl();
};
export const ChartOutlabeledPi2 = (data: any) => {
  const ChartOutlabeledPie = new QuickChart();
  const processedData = processDataChart(data);

  const chartConfig = {
    type: "outlabeledPie",
    data: {
      labels: processedData.map((item: any) => item.label),
      datasets: [
        {
          label: "Ownership Distribution",
          data: processedData.map((item: any) => item.value),
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#ffce56",
            "#4bc0c0",
            "#9966ff",
            "#ff9f40",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
      layout: {
        padding: {
          top: 0,   
          bottom: 0, 
          left: 10,  
          right: 10
        }
      },
      plugins: {
        outlabels: {
          text: '%l %p',
          color: 'white',
          stretch: 17,
          font: {
            resizable: true,
            minSize: 5,
            maxSize: 7,
          },
        },
      
        // datalabels: {
        //   display: (context: any) => {
        //     const value = context.dataset.data[context.dataIndex];
        //     return value > 0; 
        //   },
        //   color: '#5b81ac',
        //   formatter: (value: any, ctx: any) => {
        //     const label = ctx.chart.data.labels[ctx.dataIndex];
        //     const percentage = Math.round(value * 10) / 10;
        //     return `${label}: ${percentage}%`;
        //   },
        //   align: 'end',
        //   anchor: 'end',
        //   offset: 10,
        //   font: {
        //     weight: 'bold',
        //     size: 11
        //   }
        // }
      },
    },
  };

  ChartOutlabeledPie
    .setConfig(chartConfig)
    .setWidth(150)     
    .setHeight(150)    
    .setBackgroundColor("transparent");

  return ChartOutlabeledPie.getUrl();
};


export const ChartLine = (data:any) => {
  const ChartLine = new QuickChart();
  const colorPalette = [
    { backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)' },
    { backgroundColor: 'rgb(54, 162, 235)', borderColor: 'rgb(54, 162, 235)' },
    { backgroundColor: 'rgb(75, 192, 192)', borderColor: 'rgb(75, 192, 192)' },
    { backgroundColor: 'rgb(192, 192, 75)', borderColor: 'rgb(192, 192, 75)' },
    { backgroundColor: 'rgb(192, 75, 192)', borderColor: 'rgb(192, 75, 192)' },
    { backgroundColor: 'rgb(75, 75, 192)', borderColor: 'rgb(75, 75, 192)' },
    
  ];
  const chartConfig ={
    type: 'line',
    data: {
      labels: data.map((item:any) => item.label),
      datasets: data.map((ratio:any, index:any) => ({
        label: ratio.EnTitle || ratio.Title,
        ...colorPalette[index % colorPalette.length],
        data: ratio.DataChart.map((item: any) => item.Y),
        fill: false,
      })),
    },
    options: {
      title: {
        display: true,
       
      },
    },
  }
  ChartLine
    .setConfig(chartConfig)
    .setWidth(400)
    .setHeight(300)
    .setBackgroundColor("white");

  return ChartLine.getUrl();
}
export const ChartTwoColumn = (data:any) => {
  const ChartTwoColumn = new QuickChart();
  const exportData =  data[0];
  const importData = data[1];
  const exportValues = exportData.DataChart.map((item: any) => item.Y || 0);
  const importValues = importData.DataChart.map((item: any) => item.Y || 0);
  const maxValue = Math.max(...exportValues, ...importValues);
  
 
  const suggestedMax = maxValue * 1.05;
  
 
  const roundToNice = (value:number) => {
    if (value <= 10) return 10;
    const power = Math.floor(Math.log10(value));
    const base = Math.pow(10, power);
    
    if (value / base <= 1.5) return 2 * base;
    if (value / base <= 3) return 3 * base; 
    if (value / base <= 7) return 8 * base;
    return 10 * base;
  };
  
  const roundedMax = roundToNice(suggestedMax);
  
  const formatNumber = (num: number) => {
    if (num === 0) return '0.00';
    
    // Sử dụng toFixed thay vì Intl.NumberFormat để tránh lỗi
    return num.toFixed(2);
  };
  
  
  const formatYAxisLabel = (value: number) => {
    if (value === 0) return '0,00 USD';
    return `${value.toFixed(2).replace('.', ',')} USD`;
  };
  const chartConfig = {
    type: 'bar',
    data: {
      labels: [2019, 2020, 2021, 2022, 2023],
      datasets: [
        {
          label: exportData.EnTitle || exportData.Title,
          backgroundColor: 'rgb(65, 105, 225)',
          data: exportValues,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
          datalabels: {
            display: (context: any) => {
              return context.dataset.data[context.dataIndex] > 0;
            },
            color: '#000',
            anchor: 'end',
            align: 'top',
           
            formatter: function(value:number) {
              return value.toFixed(2).replace('.', ',');
            }
          }
        },
        {
          label: importData.EnTitle || importData.Title,
          backgroundColor: 'rgb(32, 201, 202)', 
          data: importValues,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
          datalabels: {
            display: (context: any) => {
              return context.dataset.data[context.dataIndex] > 0;
            },
            color: '#000',
            anchor: 'end',
            align: 'top',
            formatter: function(value:number) {
              return value.toFixed(2).replace('.', ',');
            }
          }
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom', 
        align: 'center',    
        labels: {
          usePointStyle: true, 
          boxWidth: 12,       
          padding: 10,      
          fontSize: 8,        
          fontColor: '#666'    
        },
       
        onClick: null
      },
      plugins: {
        
        title: {
          display: false
        },
        datalabels: {
          font: {
           
            size: 7
          }
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontSize: 11
          }
        }],
        yAxes: [{
          gridLines: {
            color: '#E0E0E0',
            zeroLineColor: '#E0E0E0'
          },
          ticks: {
            beginAtZero: true,
            fontSize: 9,
            
            callback: function(value:number) {
              if (value === 0) return '0,00 USD';
              return `${value.toFixed(2).replace('.', ',')} USD`;
            },
            suggestedMax: roundedMax,
            
            padding: 10
          
           
          }
        }]
      },
      

     
      tooltips: {
        callbacks: {
          label: function(tooltipItem:any, data:any) {
            const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            const label = data.datasets[tooltipItem.datasetIndex].label;
            return `${label}: ${value.toFixed(2).replace('.', ',')} USD`;
          }
        }
      }
    }
  };
  
    ChartTwoColumn
    .setConfig(chartConfig)
    .setWidth(400)
    .setHeight(300)
    .setBackgroundColor("white");

  return ChartTwoColumn.getUrl();
    
  
}
export const ChartBarLineChart = (data: any) => {
  if (!data || !data.labels || !data.barData1 || !data.barData2 || !data.lineData) {
    console.error('Missing required data for bar-line chart');
    return null;
  }

  const ChartBarLineChart = new QuickChart();
  
  const chartConfig = {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          
          type: 'bar',
          label: data.barLabel1 || 'Bar Data 1',
          backgroundColor: 'rgb(54, 210, 210)',
          data: data.barData1,
          yAxisID: 'y',
          order: 2
        },
        {
          
          type: 'bar',
          label: data.barLabel2 || 'Bar Data 2',
          backgroundColor: 'rgb(255, 159, 64)',
          data: data.barData2,
          yAxisID: 'y',
          order: 2
        },
        {
          
          type: 'bar',
          label: data.barLabel3 || 'Bar Data 3',
          backgroundColor: 'rgb(252, 83, 218)',
          data: data.barData3,
          yAxisID: 'y',
          order: 2
        },
        {
          
          type: 'line',
          label: data.lineLabel || 'Line Data',
          borderColor: 'rgb(255, 0, 0)',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          data: data.lineData,
          yAxisID: 'y1',
          fill: false,
          pointRadius: 3,
          borderWidth: 2,
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: data.title || 'Bar and Line Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      scales: {
        xAxes: [{
          stacked: false,
          gridLines: {
            display: false
          }
        }],
        yAxes: [
          {
            id: 'y',
            type: 'linear',
            display: true,
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: data.yLabel || 'Tỷ VNĐ'
            },
            ticks: {
              beginAtZero: true,
              callback: function(value: any) {
                return value + ' Tỷ VNĐ';
              }
            }
          },
          {
            id: 'y1',
            type: 'linear',
            display: true,
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: data.y1Label || '%'
            },
            gridLines: {
              drawOnChartArea: false
            },
            ticks: {
              callback: function(value: any) {
                return value + '%';
              }
            }
          }
        ]
      },
      legend: {
        position: 'bottom'
      }
    }
  };

  ChartBarLineChart
    .setConfig(chartConfig)
    .setWidth(800)
    .setHeight(500)
    .setBackgroundColor('#041e49'); // Background màu xanh đậm như hình mẫu

  return ChartBarLineChart.getUrl();
};