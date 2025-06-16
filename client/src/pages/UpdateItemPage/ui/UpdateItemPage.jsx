import { memo } from 'react';
import cls from './UpdateItemPage.module.scss';
import { useParams } from 'react-router-dom';
import { ItemForm } from '../../../shared/ui/ItemForm/ui/ItemForm';
import { itemAPI } from '../../../app/store/services/ItemService';
import { PageNavigation } from '../../../shared/ui/PageNavigation/PageNavigation';

export const UpdateItemPage = memo(() => {
	const { id } = useParams();
	const { data: item, isLoading, error } = itemAPI.useFetchItemByIdQuery(id);

	if (isLoading) return <div className={cls.UpdateItemPage}>Loading...</div>;
	if (error) return <div className={cls.UpdateItemPage}>Error: {error}</div>;
	if (!item) return <div className={cls.UpdateItemPage}>Item not found</div>;

	return (
		<div className={cls.UpdateItemPage}>
			<PageNavigation id={id} />
			<ItemForm update={true} initialData={item} />
		</div>
	);
});
