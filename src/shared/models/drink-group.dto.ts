import { DrinkItemDTO } from './drink-item.dto';
import { Afa } from './coin.model';

export type DrinkGroupDTO = {
	items: DrinkItemDTO[] | [];
	name:string;
	nameoftype: string;
	afa: Afa;
};
