import {
	Form,
	useNavigation,
	useOutletContext,
	redirect,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';

export async function action({ request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		const response = await fetch('/api/v1/jobs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const { message } = await response.json();
		if (message == 'Job created successfully') {
			toast.success(message);
			return redirect('all-jobs');
		} else {
			toast.error(message);
			return null;
		}
	} catch (error) {
		console.error('Error:', error);
		return error;
	}
}

export default function AddJob() {
	const { user } = useOutletContext();
	const navigation = useNavigation();

	const isSubmtting = navigation.state === 'submitting';
	return (
		<Wrapper>
			<Form method='post' className='form'>
				<h4 className='form-title'>add job</h4>
				<div className='form-center'>
					<FormRow type='text' name='position' />
					<FormRow type='text' name='company' />
					<FormRow type='text' name='jobLocation' labelText='job location' />
					<FormRowSelect
						labelText='job status'
						name='jobStatus'
						defaultValue={JOB_STATUS.PENDING}
						list={Object.values(JOB_STATUS)}
					/>
					<FormRowSelect
						labelText='job type'
						name='jobType'
						defaultValue={JOB_TYPE.FULL_TIME}
						list={Object.values(JOB_TYPE)}
					/>
					<button disabled={isSubmtting} className='btn btn-block form-btn'>
						{isSubmtting ? 'submitting' : 'submit'}
					</button>
				</div>
			</Form>
		</Wrapper>
	);
}
