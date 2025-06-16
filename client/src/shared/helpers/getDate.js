export const getDate = (date, full) => {
	const rawDate = date;
	const dateToNew = new Date(rawDate);
	const formattedDate = dateToNew.toLocaleDateString('en-GB');
	return formattedDate.replace(/\//g, '.');
};
