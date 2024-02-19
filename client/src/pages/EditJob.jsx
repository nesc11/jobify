import { redirect, useLoaderData, Form, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';

import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';

export async function loader({ params }) {
	try {
		const response = await fetch(`/api/v1/jobs/${params.jobId}`);
		const data = await response.json();
		if (!data.job) {
			toast.error(data.message);
			return redirect('/dashboard/all-jobs');
		}
		return data;
	} catch (error) {
		console.error('Error:', error);
		toast.error(error.message);
		return redirect('/dashboard/all-jobs');
	}
}

export async function action({ request, params }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		const response = await fetch(`/api/v1/jobs/${params.jobId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const { message } = await response.json();
		if (message == 'Job modified successfully') {
			toast.success(message);
			return redirect('../all-jobs');
		} else {
			toast.error(message);
			return null;
		}
	} catch (error) {
		console.error('Error:', error);
		return error;
	}
}

export default function EditJob() {
	const { job } = useLoaderData();
	const navigation = useNavigation();
	const isSubmitting = navigation.state == 'submitting';
	return (
		<Wrapper>
			<Form method='post' className='form'>
				<h4 className='form-title'>edit job</h4>
				<div className='form-center'>
					<FormRow type='text' name='position' defaultValue={job.position} />
					<FormRow type='text' name='company' defaultValue={job.company} />
					<FormRow
						type='text'
						name='jobLocation'
						defaultValue={job.jobLocation}
						labelText='job location'
					/>
					<FormRowSelect
						name='jobStatus'
						labelText='job status'
						defaultValue={job.jobStatus}
						list={Object.values(JOB_STATUS)}
					/>
					<FormRowSelect
						name='jobType'
						labelText='job type'
						defaultValue={job.jobType}
						list={Object.values(JOB_TYPE)}
					/>
					<button className='btn btn-block form-btn' disabled={isSubmitting}>
						{isSubmitting ? 'submitting...' : 'submit'}
					</button>
				</div>
			</Form>
		</Wrapper>
	);
}
