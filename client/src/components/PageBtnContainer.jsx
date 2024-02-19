import { useLocation, useNavigate } from 'react-router-dom';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

import Wrapper from '../assets/wrappers/PageBtnContainer';

export default function PageBtnContainer({ numOfPages, currentPage }) {
	const navigate = useNavigate();
	const location = useLocation();

	const pagesEls = Array.from(
		{ length: numOfPages },
		(_, index) => index + 1,
	).map((pageNum) => (
		<button
			onClick={() => handlePagination(pageNum)}
			key={pageNum}
			className={`bth page-btn ${pageNum === currentPage && 'active'}`}
		>
			{pageNum}
		</button>
	));

	const handlePagination = (pageNum) => {
		const searchParams = new URLSearchParams(location.search);
		searchParams.set('page', pageNum);
		navigate(`${location.pathname}?${searchParams.toString()}`);
	};

	return (
		<Wrapper>
			<button
				onClick={() => {
					if (currentPage === 1) handlePagination(1);
					else handlePagination(currentPage + 1);
				}}
				disabled={currentPage === 1}
				className='btn prev-btn'
			>
				<HiChevronDoubleLeft />
				prev
			</button>
			<div className='btn-container'>{pagesEls}</div>
			<button
				onClick={() => {
					if (currentPage === numOfPages) handlePagination(numOfPages);
					else handlePagination(currentPage + 1);
				}}
				disabled={currentPage === numOfPages}
				className='btn next-btn'
			>
				next
				<HiChevronDoubleRight />
			</button>
		</Wrapper>
	);
}
