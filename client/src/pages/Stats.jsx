import { useLoaderData } from 'react-router-dom';
import { ChartsContainer, StatsContainer } from '../components';

export async function loader() {
	try {
		const response = await fetch('/api/v1/jobs/stats');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		return error;
	}
}
export default function Stats() {
	const { monthlyApplications, defaultStats } = useLoaderData();
	return (
		<>
			<StatsContainer defaultStats={defaultStats} />
			{monthlyApplications?.length > 1 && (
				<ChartsContainer monthlyApplications={monthlyApplications} />
			)}
		</>
	);
}
