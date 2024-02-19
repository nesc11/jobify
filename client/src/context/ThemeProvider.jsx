import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(() => {
		const themeFromStorage = window.localStorage.getItem('theme');
		let defaultTheme = themeFromStorage ? themeFromStorage : 'light';
		// document.body.classList.toggle('dark-theme', defaultTheme === 'dark');
		return defaultTheme;
	});
	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		// document.body.classList.toggle('dark-theme', newTheme === 'dark');
		window.localStorage.setItem('theme', newTheme);
	};
	const themeObject = { theme, toggleTheme };

	useEffect(() => {
		document.body.classList.toggle('dark-theme', theme === 'dark');
	}, [theme]);
	return (
		<ThemeContext.Provider value={themeObject}>
			{children}
		</ThemeContext.Provider>
	);
}
