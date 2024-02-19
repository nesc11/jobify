import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';

export default function StatsContainer({ defaultStats }) {
	const stats = [
		{
			title: 'pending applications',
			count: defaultStats?.pending || 0,
			icon: <FaSuitcaseRolling />,
			color: '#f59e0b',
			bcg: '#fef3c7',
		},
		{
			title: 'interviews scheduled',
			count: defaultStats?.interview || 0,
			icon: <FaCalendarCheck />,
			color: '#f59e0b',
			bcg: '#fef3c7',
		},
		{
			title: 'jobs declined',
			count: defaultStats?.declined || 0,
			icon: <FaBug />,
			color: '#d66a6a',
			bcg: '#ffeeee',
		},
	];
	return (
		<Wrapper>
			{stats.map((item) => (
				<StatItem key={item.title} {...item} />
			))}
		</Wrapper>
	);
}
