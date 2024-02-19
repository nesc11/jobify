import { useSubmit, Form, useNavigate } from 'react-router-dom';

import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../components';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';

export default function SearchContainer({ params }) {
	const submit = useSubmit();
	const navigate = useNavigate();
	const handleReset = (e) => {
		e.target.form.reset();
		navigate('/dashboard/all-jobs');
	};
	return (
		<Wrapper>
			<Form
				onChange={(e) => {
					submit(e.currentTarget);
				}}
				className='form'
			>
				<h5 className='form-title'>search form</h5>
				<div className='form-center'>
					<FormRow
						type='search'
						name='search'
						defaultValue={params.search || ''}
					/>
					<FormRowSelect
						labelText='job status'
						name='jobStatus'
						list={['all', ...Object.values(JOB_STATUS)]}
						defaultValue={params.jobStatus || 'all'}
					/>
					<FormRowSelect
						labelText='job type'
						name='jobType'
						list={['all', ...Object.values(JOB_TYPE)]}
						defaultValue={params.jobType || 'all'}
					/>
					<FormRowSelect
						name='sort'
						list={Object.values(JOB_SORT_BY)}
						defaultValue={params.sort || 'newest'}
					/>
					<button
						onClick={handleReset}
						type='button'
						className='btn form-btn delete-btn'
					>
						Reset Search Values
					</button>
				</div>
			</Form>
		</Wrapper>
	);
}
