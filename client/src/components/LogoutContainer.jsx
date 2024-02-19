import { useState } from 'react';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

import Wrapper from '../assets/wrappers/LogoutContainer';
import { useNavigate } from 'react-router-dom';

// import { useDashboard } from '../hooks/useDashboard';

export default function LogoutContainer({ user }) {
	const [showLogout, setShowLogout] = useState(false);
	const navigate = useNavigate();
	const logoutUser = async () => {
		try {
			const response = await fetch('/api/v1/auth/logout');
			const { message } = await response.json();
			navigate('/');
			toast.success(message);
		} catch (error) {
			console.error('Error:', error);
		}
	};
	return (
		<Wrapper>
			<button
				onClick={() => setShowLogout((prevBool) => !prevBool)}
				className='btn logout-btn'
			>
				{user.avatar ? (
					<img src={user.avatar} alt='avatar' className='img' />
				) : (
					<FaUserCircle />
				)}

				{user.name}
				<FaCaretDown />
			</button>
			<div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
				<button className='dropdown-btn' onClick={logoutUser}>
					logout
				</button>
			</div>
		</Wrapper>
	);
}
