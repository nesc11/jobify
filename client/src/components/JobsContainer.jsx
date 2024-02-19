import Wrapper from '../assets/wrappers/JobsContainer';
import Job from './Job';
import PageBtnContainer from './PageBtnContainer';

export default function JobsContainer({
	jobs,
	totalJobs,
	numOfPages,
	currentPage,
}) {
	if (jobs.length === 0)
		return (
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		);
	return (
		<Wrapper>
			<h5>
				{totalJobs} job{`${totalJobs === 1 ? '' : 's'}`} found
			</h5>
			<div className='jobs'>
				{jobs.map((job) => (
					<Job key={job._id} job={job} />
				))}
			</div>
			{numOfPages > 1 && (
				<PageBtnContainer numOfPages={numOfPages} currentPage={currentPage} />
			)}
		</Wrapper>
	);
}
