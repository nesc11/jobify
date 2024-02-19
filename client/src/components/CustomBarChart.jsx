import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';

export default function CustomBarChart({ monthlyApplications }) {
	return (
		<ResponsiveContainer width='100%' height={300}>
			<BarChart data={monthlyApplications} margin={{ top: 50 }}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='date' />
				<YAxis allowDecimals={false} />
				<Tooltip />
				<Bar dataKey='count' fill='#2cb1bc' barSize={75} />
			</BarChart>
		</ResponsiveContainer>
	);
}
