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
        align: "center",
        labels: {
          usePointStyle: true,
          boxWidth: 12,
          padding: 8,
          fontSize: 8,
          fontColor: "#666",
        },
      },
      layout: {
        padding: {
          top: 0,
          bottom: 0,
          left: 10,
          right: 10,
        },
      },
      plugins: {
        outlabels: {
          text: "%l %p",
          color: "white",
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

  ChartOutlabeledPie.setConfig(chartConfig)
    .setWidth(300)
    .setHeight(230)
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
          right: 10,
        },
      },
      plugins: {
        outlabels: {
          text: "%l %p",
          color: "white",
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

  ChartOutlabeledPie.setConfig(chartConfig)
    .setWidth(200)
    .setHeight(200)
    .setBackgroundColor("transparent");

  return ChartOutlabeledPie.getUrl();
};

export const ChartLine = (data: any) => {
  const ChartLine = new QuickChart();
  const colorPalette = [
    { backgroundColor: "rgb(255, 99, 132)", borderColor: "rgb(255, 99, 132)" },
    { backgroundColor: "rgb(54, 162, 235)", borderColor: "rgb(54, 162, 235)" },
    { backgroundColor: "rgb(75, 192, 192)", borderColor: "rgb(75, 192, 192)" },
    { backgroundColor: "rgb(192, 192, 75)", borderColor: "rgb(192, 192, 75)" },
    { backgroundColor: "rgb(192, 75, 192)", borderColor: "rgb(192, 75, 192)" },
    { backgroundColor: "rgb(75, 75, 192)", borderColor: "rgb(75, 75, 192)" },
  ];
  const allValues = data.flatMap((ratio: any) =>
    ratio.DataChart.map((item: any) => item.Y || 0)
  );
  const maxValue = Math.max(...allValues, 0.01) * 1.1;
  const labels = data[0].DataChart.map(
    (item: any) => item.Label || item.EnLabel
  );
  const datasets = data.map((ratio: any, index: number) => {
    const colorIndex = index % colorPalette.length;
    const color = colorPalette[colorIndex] || colorPalette[0];
    return {
      label: ratio.EnTitle || ratio.Title,
      borderColor: color?.borderColor,
      backgroundColor: color?.backgroundColor,
      data: ratio.DataChart.map((item: any) => item.Y),
      fill: false,
      tension: 0.1,
      pointRadius: 2,
      pointStyle: "circle",
      borderWidth: 1,
    };
  });
  const chartConfig = {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "bottom",
        align: "center",
        
        labels: {
          usePointStyle: true,
          boxWidth: 8 ,
          padding: 6,
          fontSize: 6,
          fontColor: "#666",
        },
      },
      scales: {
     
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              fontSize:8,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: "#E0E0E0",
              zeroLineColor: "#E0E0E0",
            },
            ticks: {
              callback: function (value: any) {
                return value.toLocaleString("vi-VN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
              },
              fontSize: 8,
            },
          },
        ],
      },
      plugins: {
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#000",
          bodyColor: "#000",
          borderColor: "#ddd",
          borderWidth: 1,
          padding: 7,
          callbacks: {
            label: function (context: any) {
              let label = context.dataset.label || "";
              let value = context.raw;
              return (
                label +
                ": " +
                value.toLocaleString("vi-VN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              );
            },
          },
        },
      },
    },
  };
  ChartLine.setConfig(chartConfig)
    .setWidth(150)
    .setHeight(250)
    .setBackgroundColor("white");

  return ChartLine.getUrl();
};

export const ChartCompanyPerformance = (data: any) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error("Missing or invalid data for company performance chart");
    return null;
  }

  // Trích xuất dữ liệu từ đầu vào
  const revenueItem = data.find((item: any) => 
    item.EnTitle?.toLowerCase().includes("Net revenue") || 
    item.Title?.toLowerCase().includes("Doanh thu thuần"));
  
  const cogsItem = data.find((item: any) => 
    item.EnTitle?.toLowerCase().includes("Cost of goods sold") || 

    item.Title?.toLowerCase().includes("Giá vốn hàng hóa"));
  
  const grossProfitItem = data.find((item: any) => 
    item.EnTitle?.toLowerCase().includes("Gross profit") || 
    item.Title?.toLowerCase().includes("Lợi nhuận gộp"));
  
  const netProfitMarginItem = data.find((item: any) => 
    item.EnTitle?.toLowerCase().includes("Net profit margin") || 
    item.Title?.toLowerCase().includes("Biên lợi nhuận ròng"));

  const labels = ["2021", "2022", "2023"];
  
  const revenueData = revenueItem?.DataChart?.map((item: any) => item.Y) || [150000, 250000, 280000];
  const cogsData = cogsItem?.DataChart?.map((item: any) => item.Y) || [200000, 230000, 260000];
  const grossProfitData = grossProfitItem?.DataChart?.map((item: any) => item.Y) || [-50000, 20000, 20000];
  const netProfitMarginData = netProfitMarginItem?.DataChart?.map((item: any) => item.Y) || [1.5, 2.0, 2.2];

  const chart = new QuickChart();

  const chartConfig = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          type: "bar",
          label: "Net revenue",
          backgroundColor: "rgb(32, 201, 202)",
          data: revenueData,
          yAxisID: "y-left",
          order: 1,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
        },
        {
          type: "bar",
          label: "Cost of goods sold",
          backgroundColor: "rgb(156, 138, 215)",
          data: cogsData,
          yAxisID: "y-left",
          order: 1,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
        },
        {
          type: "bar",
          label: "Gross profit",
          backgroundColor: "rgb(255, 169, 49)",
          data: grossProfitData,
          yAxisID: "y-left",
          order: 1,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
        },
        {
          type: "line",
          label: "Net profit margin",
          borderColor: "rgb(255, 59, 59)",
          backgroundColor: "rgb(255, 59, 59)",
          pointBackgroundColor: "rgb(255, 59, 59)",
          data: netProfitMarginData,
          yAxisID: "y-right",
          fill: false,
          pointRadius: 3,
          borderWidth: 2,
          lineTension: 0,
          order: 0,
        }
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,   
          fontSize: 8,
          boxWidth: 12,
          padding: 8,
          color: "#666",
        },
      },
      tooltips: { 
        mode: "index",
        intersect: false,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            let value = context.raw;
            return context.datasetIndex === 3 
              ? `${label}: ${value}%` 
              : `${label}: ${value.toLocaleString()} Million VND`;
          }
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(200, 200, 200, 0.3)",
            },
            ticks: {
              fontSize: 8,
            },
          },
        ],
        yAxes: [
          {
            id: "y-left",
            type: "linear",
            position: "left",
            beginAtZero: true,
            gridLines: {
              color: "rgba(200, 200, 200, 0.3)",
            },
            ticks: {
              fontSize: 8,
              callback: function(value: any) {
                return `${value.toLocaleString()}M VND`;
              },
            },
          },
          {
            id: "y-right",
            type: "linear",
            position: "right",
            beginAtZero: true,
            gridLines: {
              drawOnChartArea: false,
            },
            ticks: {
              fontSize: 8,
              color: "rgb(255, 59, 59)",
              callback: function(value: any) {
                return value + "%";
              },
            },
          },
        ],
      },
    },
  };

  chart.setConfig(chartConfig)
    .setWidth(600)
    .setHeight(400)
    .setBackgroundColor("white");

  return chart.getUrl();
};




export const ChartTwoColumn = (data: any) => {
  const ChartTwoColumn = new QuickChart();
  const exportData = data[0];
  const importData = data[1];
  const exportValues = exportData.DataChart.map((item: any) => item.Y || 0);
  const importValues = importData.DataChart.map((item: any) => item.Y || 0);
  const maxValue = Math.max(...exportValues, ...importValues);

  const suggestedMax = maxValue * 1.05;

  const roundToNice = (value: number) => {
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
    if (num === 0) return "0.00";

    // Sử dụng toFixed thay vì Intl.NumberFormat để tránh lỗi
    return num.toFixed(2);
  };

  const formatYAxisLabel = (value: number) => {
    if (value === 0) return "0,00 USD";
    return `${value.toFixed(2).replace(".", ",")} USD`;
  };
  const chartConfig = {
    type: "bar",
    data: {
      labels: [2019, 2020, 2021, 2022, 2023],
      datasets: [
        {
          label: exportData.EnTitle || exportData.Title,
          backgroundColor: "rgb(65, 105, 225)",
          data: exportValues,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
          datalabels: {
            display: (context: any) => {
              return context.dataset.data[context.dataIndex] > 0;
            },
            color: "#000",
            anchor: "end",
            align: "top",

            formatter: function (value: number) {
              return value.toFixed(2).replace(".", ",");
            },
          },
        },
        {
          label: importData.EnTitle || importData.Title,
          backgroundColor: "rgb(32, 201, 202)",
          data: importValues,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
          datalabels: {
            display: (context: any) => {
              return context.dataset.data[context.dataIndex] > 0;
            },
            color: "#000",
            anchor: "end",
            align: "top",
            formatter: function (value: number) {
              return value.toFixed(2).replace(".", ",");
            },
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: "bottom",
        align: "center",
        labels: {
          usePointStyle: true,
          boxWidth: 12,
          padding: 10,
          fontSize: 8,
          fontColor: "#666",
        },

        onClick: null,
      },
      plugins: {
        title: {
          display: false,
        },
        datalabels: {
          font: {
            size: 7,
          },
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              fontSize: 11,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: "#E0E0E0",
              zeroLineColor: "#E0E0E0",
            },
            ticks: {
              beginAtZero: true,
              fontSize: 9,

              callback: function (value: number) {
                if (value === 0) return "0,00 USD";
                return `${value.toFixed(2).replace(".", ",")} USD`;
              },
              suggestedMax: roundedMax,

              padding: 10,
            },
          },
        ],
      },

      tooltips: {
        callbacks: {
          label: function (tooltipItem: any, data: any) {
            const value =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            const label = data.datasets[tooltipItem.datasetIndex].label;
            return `${label}: ${value.toFixed(2).replace(".", ",")} USD`;
          },
        },
      },
    },
  };

  ChartTwoColumn.setConfig(chartConfig)
    .setWidth(400)
    .setHeight(300)
    .setBackgroundColor("white");

  return ChartTwoColumn.getUrl();
};
export const ChartBarLineChart = (data: any) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error("Missing or invalid data for bar-line chart");
    return null;
  }

  const labels = ["2021", "2022", "2023"];

  const ebitItem = data.find((item: any) => item.EnTitle?.includes("EBIT") || item.Title?.includes("EBIT"));
  const roeItem = data.find((item: any) => item.EnTitle?.includes("ROE") || item.Title?.includes("ROE"));
  const roaItem = data.find((item: any) => item.EnTitle?.includes("ROA") || item.Title?.includes("ROA"));

  const ebitData = ebitItem?.DataChart?.map((item: any) => item.Y) || [32500000, 39200000, 39900000];
  const roeData = roeItem?.DataChart?.map((item: any) => item.Y) || [16, 18, 17];
  const roaData = roaItem?.DataChart?.map((item: any) => item.Y) || [12, 13.5, 13];

  // Xác định phạm vi giá trị cho cả giá trị dương và âm
  const maxEbit = Math.max(...ebitData);
  const minEbit = Math.min(...ebitData);
  const maxRoe = Math.max(...roeData);
  const minRoe = Math.min(...roeData);
  const maxRoa = Math.max(...roaData);
  const minRoa = Math.min(...roaData);

  const ChartBarLineChart = new QuickChart();

  const chartConfig = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          type: "bar",
          label: "EBIT (Mil VND)",
          backgroundColor: "rgb(32, 201, 202)",
          data: ebitData,
          yAxisID: "y",
          order: 2,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        },
        {
          type: "line",
          label: "ROE (%)",
          borderColor: "rgb(255, 59, 59)",
          backgroundColor: "rgb(255, 59, 59)",
          data: roeData,
          yAxisID: "y1",
          fill: false,
          pointRadius: 3,
          pointStyle: "circle",
          borderWidth: 2.5,
          lineTension: 0,
          order: 1,
        },
        {
          type: "line",
          label: "ROA (%)",
          borderColor: "rgb(156, 39, 176)",
          backgroundColor: "rgb(156, 39, 176)",
          data: roaData,
          yAxisID: "y1",
          fill: false,
          pointRadius: 3,
          pointStyle: "circle",
          borderWidth: 2.5,
          lineTension: 0,
          order: 1,
        }
      ],
    },
    options: {
      stacked: false,
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "Management Efficiency Ratios"
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      scales: {
        yAxes: [
          {
            id: "y",
            type: "linear",
            display: true,
            position: "left",
            ticks: {
          
              callback: function (value: any) {
                return Math.floor(value).toLocaleString();
              },
            },
          },
          {
            id: "y1",
            type: "linear",
            display: true,
            position: "right",
            gridLines: {
              drawOnChartArea: false
            },
            ticks: {
              callback: function (value: any) {
                return value + "%";
              },
            },
          },
        ],
      },
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 12,
          padding: 15,
          fontColor: "#666",
        }
      },
    },
  };

  ChartBarLineChart.setConfig(chartConfig)
    .setWidth(600)
    .setHeight(400)
    .setBackgroundColor("white");

  return ChartBarLineChart.getUrl();
};
