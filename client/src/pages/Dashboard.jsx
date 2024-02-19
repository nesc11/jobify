import { Outlet, redirect, useLoaderData } from 'react-router-dom';

import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import DashboardProvider from '../context/DashboardProvider';

export async function loader() {
	try {
		const response = await fetch('/api/v1/users/current-user');
		const data = await response.json();
		if (!data.user) return redirect('/');
		return data;
	} catch (error) {
		console.error('Error:', error);
		return redirect('/');
	}
}

export default function Dashboard() {
	const { user } = useLoaderData();
	return (
		<DashboardProvider>
			<Wrapper>
				<main className='dashboard'>
					<SmallSidebar user={user} />
					<BigSidebar user={user} />
					<div>
						<Navbar user={user} />
						<div className='dashboard-page'>
							<Outlet context={{ user }} />
						</div>
					</div>
				</main>
			</Wrapper>
		</DashboardProvider>
	);
}
