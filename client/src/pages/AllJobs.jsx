import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';

export async function loader({ request }) {
	const params = Object.fromEntries(
		new URL(request.url).searchParams.entries(),
	);
	const paramsArray = Object.entries(params).map((entry) => entry.join('='));
	let paramsString = '';
	if (paramsArray.length > 0) {
		paramsString = `?${paramsArray.join('&')}`;
	}
	try {
		const response = await fetch(`/api/v1/jobs${paramsString}`);
		const data = await response.json();
		if (!data.jobs) {
			toast.error(data.message);
		}
		return { data, params };
	} catch (error) {
		console.error('Error:', error);
		toast.error(error);
		return error;
	}
}

export default function AllJobs() {
	const {
		data: { jobs, totalJobs, numOfPages, currentPage },
		params,
	} = useLoaderData();
	return (
		<>
			<SearchContainer params={params} />
			<JobsContainer
				jobs={jobs || []}
				totalJobs={totalJobs}
				numOfPages={numOfPages}
				currentPage={currentPage}
			/>
		</>
	);
}
