import { useEffect, useState } from 'react';

export const useBreakpoint = (maxWidth) => {
	const [isBelow, setIsBelow] = useState(false);

	useEffect(() => {
		if (typeof maxWidth !== 'number') {
			console.warn('useBreakpoint expects a numeric value.');
			return;
		}

		const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);

		const handleChange = (e) => setIsBelow(e.matches);

		setIsBelow(mediaQuery.matches);

		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, [maxWidth]);

	return isBelow;
};
