import { FaAlignLeft } from 'react-icons/fa';

import Wrapper from '../assets/wrappers/Navbar';
import Logo from './Logo';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';
import { useDashboard } from '../hooks/useDashboard';

export default function Navbar({ user }) {
	const { toggleSidebar } = useDashboard();
	return (
		<Wrapper>
			<div className='nav-center'>
				<button onClick={toggleSidebar} className='toggle-btn'>
					<FaAlignLeft />
				</button>
				<div>
					<Logo />
					<h4 className='logo-text'>dashboard</h4>
				</div>
				<div className='btn-container'>
					<ThemeToggle />
					<LogoutContainer user={user} />
				</div>
			</div>
		</Wrapper>
	);
}
