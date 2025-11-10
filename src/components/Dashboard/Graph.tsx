import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    Filler,
    type ChartOptions,
} from "chart.js";

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale, Legend, Filler);

interface GraphProps {
    graphData: { clickDate: string; count: number }[];
}

const Graph = ({ graphData }: GraphProps) => {
    const labels = graphData?.map((item) => item.clickDate);
    const userPerDay = graphData?.map((item) => item.count);

    const data = {
        labels:
            graphData.length > 0
                ? labels
                : ["", "", "", "", "", "", "", "", "", "", "", ""],
        datasets: [
            {
                label: "Total Clicks",
                data:
                    graphData.length > 0
                        ? userPerDay
                        : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2],
                backgroundColor:
                    graphData.length > 0 ? "#3b82f6" : "rgba(54, 162, 235, 0.1)",
                borderColor: "#1D2327",
                fill: true,
                tension: 0.4,
                barThickness: 20,
                categoryPercentage: 1.0,
                barPercentage: 0.8,
            },
        ],
    };

    // ✅ Fully typed Chart.js options for 'bar' chart
    const options: ChartOptions<"bar"> = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: "#333",
                    font: {
                        family: "Arial",
                        size: 14,
                        weight: "bold",
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: "#333",
                    callback: (value) => (Number.isInteger(value) ? value.toString() : ""),
                },
                title: {
                    display: true,
                    text: "Number of Clicks",
                    color: "#FF0000",
                    font: {
                        family: "Arial",
                        size: 16,
                        weight: "bold",
                    },
                },
            },
            x: {
                ticks: {
                    color: "#333",
                },
                title: {
                    display: true,
                    text: "Date",
                    color: "#FF0000",
                    font: {
                        family: "Arial",
                        size: 16,
                        weight: "bold",
                    },
                },
            },
        },
    };

    return <Bar className="w-full h-80" data={data} options={options} />;
};

export default Graph;
