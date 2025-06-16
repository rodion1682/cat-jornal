import { useCallback, useEffect } from 'react';

export const useClickOutside = (props) => {
	const { target, button, duration = 500, isOpen, onClose } = props;

	const handleClickOutside = useCallback(
		(e) => {
			if (isOpen && target && !target.contains(e.target)) {
				if (onClose) {
					button?.setAttribute('disabled', 'true');
					onClose();
				}
				setTimeout(() => {
					button?.removeAttribute('disabled');
				}, duration);
			}
		},
		[isOpen, onClose, target, duration, button]
	);

	useEffect(() => {
		if (isOpen) {
			button?.setAttribute('disabled', 'true');
			setTimeout(() => {
				window.addEventListener('click', handleClickOutside);
				button?.removeAttribute('disabled');
			}, duration);
		}

		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, [isOpen, handleClickOutside, duration, button]);
};
