import { useState } from 'react';

import Wrapper from '../assets/wrappers/ChartsContainer';
import CustomBarChart from './CustomBarChart';
import CustomAreaChart from './CustomAreaChart';

export default function ChartsContainer({ monthlyApplications }) {
	const [barChart, setBarChart] = useState(true);
	return (
		<Wrapper>
			<h4>Monthly Applications</h4>
			<button onClick={() => setBarChart((prevBool) => !prevBool)}>
				{barChart ? 'Area Chart' : 'Bar Chart'}
			</button>
			{barChart ? (
				<CustomBarChart monthlyApplications={monthlyApplications} />
			) : (
				<CustomAreaChart monthlyApplications={monthlyApplications} />
			)}
		</Wrapper>
	);
}
