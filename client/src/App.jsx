import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
	Home,
	Landing,
	Register,
	Login,
	Dashboard,
	Error,
	AddJob,
	Stats,
	AllJobs,
	Profile,
	Admin,
	EditJob,
} from './pages';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as addJobAction } from './pages/AddJob';
import { action as editJobAction } from './pages/EditJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { action as profileAction } from './pages/Profile';
import { loader as dashboardLoader } from './pages/Dashboard';
import { loader as allJobsLoader } from './pages/AllJobs';
import { loader as editJobLoader } from './pages/EditJob';
import { loader as adminLoader } from './pages/Admin';
import { loader as statsLoader } from './pages/Stats';
import ThemeProvider from './context/ThemeProvider';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: 'register',
				element: <Register />,
				action: registerAction,
			},
			{
				path: 'login',
				element: <Login />,
				action: loginAction,
			},
			{
				path: 'dashboard',
				element: <Dashboard />,
				loader: dashboardLoader,
				children: [
					{
						index: true,
						element: <AddJob />,
						action: addJobAction,
					},
					{
						path: 'stats',
						element: <Stats />,
						loader: statsLoader,
					},
					{
						path: 'all-jobs',
						element: <AllJobs />,
						loader: allJobsLoader,
					},
					{
						path: 'profile',
						element: <Profile />,
						action: profileAction,
					},
					{
						path: 'admin',
						element: <Admin />,
						loader: adminLoader,
					},
					{
						path: 'edit-job/:jobId',
						element: <EditJob />,
						loader: editJobLoader,
						action: editJobAction,
					},
					{
						path: 'delete-job/:jobId',
						action: deleteJobAction,
					},
				],
			},
		],
		errorElement: <Error />,
	},
]);

export default function App() {
	return (
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}
