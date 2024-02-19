import {
	Form,
	Link,
	redirect,
	useNavigate,
	useNavigation,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow } from '../components';

export async function action({ request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	try {
		const response = await fetch('/api/v1/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const { message } = await response.json();
		if (message == 'user logged in successfully') {
			toast.success(message);
			return redirect('/dashboard');
		} else {
			toast.error(message);
			return message;
		}
	} catch (error) {
		toast.error(error.message);
		console.error('Error:', error);
		return error;
	}
}

export default function Login() {
	const navigate = useNavigate();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	const handleExploreAppSubmit = async () => {
		try {
			const response = await fetch('/api/v1/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: 'eduardo@example.com',
					password: 'password',
				}),
			});
			const { message } = await response.json();
			if (message == 'user logged in successfully') {
				toast.success(message);
				navigate('/dashboard');
			} else {
				toast.error(message);
			}
		} catch (error) {
			console.error('Error:', error);
			toast.error(error.message);
		}
	};

	return (
		<Wrapper>
			<Form method='post' className='form'>
				<Logo />
				<h4>login</h4>
				<FormRow type='email' name='email' />
				<FormRow type='password' name='password' />
				<button disabled={isSubmitting} className='btn btn-block'>
					{isSubmitting ? 'loading...' : 'submit'}
				</button>
				<button
					onClick={handleExploreAppSubmit}
					type='button'
					className='btn btn-block'
				>
					explore the app
				</button>
				<p>
					Not a member yet?{' '}
					<Link to='/register' className='member-btn'>
						Register
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
}
