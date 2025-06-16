export const getImageUrl = (path, baseUrl) => {
	if (!path) return null;
	if (path.startsWith('/uploads/') && baseUrl) {
		return `${baseUrl}${path}`;
	}
	return path;
};
