import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

import Wrapper from '../assets/wrappers/ThemeToggle';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	return (
		<Wrapper onClick={toggleTheme}>
			{theme === 'dark' ? (
				<BsFillSunFill className='toggle-icon' />
			) : (
				<BsFillMoonFill />
			)}
		</Wrapper>
	);
}
