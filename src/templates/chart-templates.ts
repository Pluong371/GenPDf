const QuickChart = require("quickchart-js");
export const generateChart = (data: any) => {
  const chart = new QuickChart();
  const chartConfig = {
    type: "outlabeledPie",
    data: {
      labels: data.map((item: any) => item.label),
      datasets: [
        {
          label: "Ownership Distribution",
          data: data.map((item:any) => item.value),
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
      plugins: {
        legend: {
          position: "top",
        },
        outlabels: {
          text: "%l %p",
          color: "white",
          stretch: 35,
          font: {
            resizable: true,
            minSize: 12,
            maxSize: 18,
          },
        },
      },
    },
  };
  chart
    .setConfig(chartConfig)
    .setWidth(400)
    .setHeight(300)
    .setBackgroundColor("white");

  return chart.getUrl();
};
