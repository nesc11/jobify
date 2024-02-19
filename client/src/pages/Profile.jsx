import { Form, useNavigation, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow } from '../components';

export async function action({ request }) {
	const formData = await request.formData();
	const file = formData.get('avatar');
	if (file && file.size > 500000) {
		toast.error('Image size too large');
		return null;
	}
	// const data = Object.fromEntries(formData);
	// console.log(data);
	try {
		const response = await fetch('/api/v1/users/update-user', {
			method: 'PATCH',
			body: formData,
		});
		const { message } = await response.json();
		if (message === 'User modified successfully') toast.success(message);
		else toast.error(message);
		return null;
	} catch (error) {
		console.error('Error:', error);
		toast.error(error.message);
		return null;
	}
}

export default function Profile() {
	const { user } = useOutletContext();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	return (
		<Wrapper>
			<Form method='post' className='form' encType='multipart/form-data'>
				<h4 className='form-title'>profile</h4>
				<div className='form-center'>
					<div className='form-row'>
						<label htmlFor='avatar' className='form-label'>
							Select an image file (max 0.5 MB)
						</label>
						<input
							type='file'
							id='avatar'
							name='avatar'
							className='form-input'
							accept='image/*'
						/>
					</div>
					<FormRow type='text' name='name' defaultValue={user.name} />
					<FormRow
						type='text'
						name='lastName'
						defaultValue={user.lastName}
						labelText='last name'
					/>
					<FormRow type='email' name='email' defaultValue={user.email} />
					<FormRow type='text' name='location' defaultValue={user.location} />
					<button className='btn btn-block form-btn' disabled={isSubmitting}>
						{isSubmitting ? 'submitting...' : 'submit'}
					</button>
				</div>
			</Form>
		</Wrapper>
	);
}
