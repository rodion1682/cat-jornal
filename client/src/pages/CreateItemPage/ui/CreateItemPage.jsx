import { memo } from 'react';
import { ItemForm } from '../../../shared/ui/ItemForm/ui/ItemForm';

export const CreateItemPage = memo(() => {
	return <ItemForm create={true} />;
});
