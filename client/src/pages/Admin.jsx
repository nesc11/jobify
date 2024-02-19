import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';

import Wrapper from '../assets/wrappers/StatsContainer';
import { StatItem } from '../components';

export async function loader() {
	try {
		const response = await fetch('/api/v1/users/admin/app-stats');
		const data = await response.json();
		if (data.users !== undefined && data.jobs !== undefined) return data;
		toast(data.message);
		return redirect('/dashboard');
	} catch (error) {
		toast(error.message);
		return redirect('/dashboard');
	}
}

export default function Admin() {
	const { users, jobs } = useLoaderData();

	return (
		<Wrapper>
			<StatItem
				title='current users'
				count={users}
				color='#e9b949'
				bcg='#fcefc7'
				icon={<FaSuitcaseRolling />}
			/>
			<StatItem
				title='total jobs'
				count={jobs}
				color='#647ecb'
				bcg='#e0e8f9'
				icon={<FaCalendarCheck />}
			/>
		</Wrapper>
	);
}
