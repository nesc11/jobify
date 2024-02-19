import { NavLink } from 'react-router-dom';

import { useDashboard } from '../hooks/useDashboard';
import { links } from '../utils/links';

export default function NavLinks({ isBigSidebar, user }) {
	const { toggleSidebar } = useDashboard();
	return (
		<div className='nav-links'>
			{links.map((link) => {
				if (link.path === 'admin' && user.role !== 'admin') return;
				return (
					<NavLink
						onClick={isBigSidebar ? null : toggleSidebar}
						className='nav-link'
						key={link.text}
						to={link.path}
						end
					>
						<span className='icon'>{link.icon}</span>
						{link.text}
					</NavLink>
				);
			})}
		</div>
	);
}
