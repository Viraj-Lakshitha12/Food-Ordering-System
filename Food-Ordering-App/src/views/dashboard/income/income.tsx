import { useState, useEffect } from 'react';
import { DashbordNavBar } from '../../../components/dashbordNavBar.tsx';
import axios from 'axios';
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Income = () => {
    const [incomeData, setIncomeData] = useState<{ date?: string; total?: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const interval = 'weekly';

    useEffect(() => {
        fetchIncomeData(interval);
    }, [interval]);

    useEffect(() => {
        console.log('Income data changed:', incomeData);
    }, [incomeData]);

    const fetchIncomeData = async (interval: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/order/income/${interval}`);
            console.log('API Response:', response.data);

            // Check if the response is in the expected format
            if (response.data && Array.isArray(response.data)) {
                setIncomeData(response.data);
            } else {
                console.error('Invalid response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching income data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Map and format income data for chart
    const dataPoints = incomeData.map((data) => ({
        label: data.date,
        y: data.total || 0,
    }));

    // Update options with dynamic dataPoints
    const options = {
        title: {
            text: "Income"
        },
        data: [
            {
                type: "column",
                dataPoints: dataPoints,
            }
        ]
    };

    return (
        <section className={'my-10'}>
            <DashbordNavBar />
            <div className="max-w-[75vw] mx-auto my-8">
                {loading ? (
                    <p>Loading income data...</p>
                ) : (
                    <CanvasJSChart options={options} />
                )}
            </div>
        </section>
    );

};

export default Income;
