import { Form, Link, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';

import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow } from '../components';

export async function action({ request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	try {
		const response = await fetch('/api/v1/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const { message } = await response.json();
		if (message == 'user created successfully') {
			toast.success(message);
			return redirect('/login');
		} else {
			toast.error(message);
			return null;
		}
	} catch (error) {
		console.error('Error:', error);
		return error;
	}
}

export default function Register() {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	return (
		<Wrapper>
			<Form method='post' className='form'>
				<Logo />
				<h4>Register</h4>
				<FormRow type='text' name='name' />
				<FormRow type='text' name='lastName' labelText='last name' />
				<FormRow type='text' name='location' />
				<FormRow type='email' name='email' />
				<FormRow type='password' name='password' />
				<button disabled={isSubmitting} className='btn btn-block'>
					{isSubmitting ? 'saving...' : 'submit'}
				</button>
				<p>
					Already a member?{' '}
					<Link to='/login' className='member-btn'>
						Login
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
}
