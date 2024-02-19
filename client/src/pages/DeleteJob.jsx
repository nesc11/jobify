import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export async function action({ params }) {
	try {
		const response = await fetch(`/api/v1/jobs/${params.jobId}`, {
			method: 'DELETE',
		});
		const { message } = await response.json();
		if (message === 'Job removed successfully') toast.success(message);
		else toast.error(message);
		return redirect('/dashboard/all-jobs');
	} catch (error) {
		console.error('Error:', error);
		toast.error(error.message);
		return redirect('/dashboard/all-jobs');
	}
}
