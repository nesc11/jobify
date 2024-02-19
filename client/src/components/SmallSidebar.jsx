import { FaTimes } from 'react-icons/fa';

import Wrapper from '../assets/wrappers/SmallSidebar';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { useDashboard } from '../hooks/useDashboard';

export default function SmallSidebar({ user }) {
	const { showSidebar, toggleSidebar } = useDashboard();
	return (
		<Wrapper>
			<div
				className={
					showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
				}
			>
				<div className='content'>
					<button onClick={toggleSidebar} className='close-btn'>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>
					<NavLinks user={user} />
				</div>
			</div>
		</Wrapper>
	);
}
