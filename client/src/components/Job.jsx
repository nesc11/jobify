import { Link, Form } from 'react-router-dom';
import dayjs from 'dayjs';
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from 'react-icons/fa';

import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';

export default function Job({ job }) {
	const date = dayjs(job.createdAt).format('MMM Do, YYYY');
	return (
		<Wrapper>
			<header>
				<div className='main-icon'>{job.company.charAt(0)}</div>
				<div className='info'>
					<h5>{job.position}</h5>
					<p>{job.company}</p>
				</div>
			</header>
			<div className='content'>
				<div className='content-center'>
					<JobInfo icon={<FaLocationArrow />} text={job.jobLocation} />
					<JobInfo icon={<FaCalendarAlt />} text={date} />
					<JobInfo icon={<FaBriefcase />} text={job.jobType} />
					<div className={`status ${job.jobStatus}`}>{job.jobStatus}</div>
				</div>
				<footer className='actions'>
					<Link to={`../edit-job/${job._id}`} className='btn edit-btn'>
						Edit
					</Link>
					<Form method='post' action={`../delete-job/${job._id}`}>
						<button className='btn delete-btn'>Delete</button>
					</Form>
				</footer>
			</div>
		</Wrapper>
	);
}
