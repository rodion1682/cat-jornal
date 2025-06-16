export const getCategoryName = (categories, id) =>
	categories.find((cat) => String(cat.id) === String(id))?.category_name || '';
