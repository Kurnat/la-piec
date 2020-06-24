import { IProduct } from './product.interface';

export interface IOrder {
    id: number;
    userName: string;
    userPhone: string;
    userCity: string;
    userStreet: string;
    userHouse: string;
    ordersDetails: Array<IProduct>;
    totalPayment: number;
    userComment: string;
    orderDate: Date;
    orderStatus: boolean;
}
