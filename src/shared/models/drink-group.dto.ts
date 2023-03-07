import { DrinkItemDTO } from './drink-item.dto';
import { Afa } from './coin.model';

export type DrinkGroupDTO = {
	items: DrinkItemDTO[] | [];
	nameoftype: string;
	afa: Afa;
};
