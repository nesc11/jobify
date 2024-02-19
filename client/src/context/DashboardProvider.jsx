import { createContext, useState } from 'react';

export const DashboardContext = createContext();

export default function DashboardProvider({ children }) {
	const [showSidebar, setShowSidebar] = useState(false);

	const toggleSidebar = () => {
		setShowSidebar((prevBool) => !prevBool);
	};

	const dashboardObject = {
		showSidebar,
		toggleSidebar,
	};
	return (
		<DashboardContext.Provider value={dashboardObject}>
			{children}
		</DashboardContext.Provider>
	);
}
