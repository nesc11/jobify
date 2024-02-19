import Wrapper from '../assets/wrappers/BigSidebar';
import NavLinks from './NavLinks';
import Logo from './Logo';
import { useDashboard } from '../hooks/useDashboard';

export default function BigSidebar({ user }) {
	const { showSidebar } = useDashboard();
	return (
		<Wrapper>
			<div
				className={
					showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
				}
			>
				<div className='content'>
					<header>
						<Logo />
					</header>
					<NavLinks user={user} isBigSidebar />
				</div>
			</div>
		</Wrapper>
	);
}
