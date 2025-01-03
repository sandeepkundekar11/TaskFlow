import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashbaordChart = () => {

    return (
        <ResponsiveContainer width="100%" height={340}>
            <PieChart width="100%" height={300}>
                <Pie
                    data={data}
                    cx={140}
                    cy={150}
                    innerRadius={100}
                    outerRadius={140}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" />

            </PieChart>
        </ResponsiveContainer>
    );
}

export default DashbaordChart