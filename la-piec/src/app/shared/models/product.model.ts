import { IProduct } from '../interfaces/product.interface';
import { ICategory } from '../interfaces/category.interface';

export class Product implements IProduct {
    constructor(
        public id: number,
        public category: ICategory,
        public nameUA: string,
        public nameEN: string,
        public description: string,
        public weight: string,
        public price: number,
        public image: string,
        public count: number = 1
    ) {}
}
