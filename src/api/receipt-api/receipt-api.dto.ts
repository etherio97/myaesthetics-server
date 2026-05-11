import { Item } from 'src/orm/item/item.entity';
import { User } from 'src/orm/user/user.entity';

export class CreateReceiptDto {
  type: 'Saloon' | 'Facial';
  user: User;
  customerName: string;
  customerContact: string;
  date: string;
  paymentMethod: number;
  subtotal: number;
  discountAmount: number;
  grandTotal: number;
  items: Item[];
}

export class UpdateReceiptDto {
  type: 'Saloon' | 'Facial';
  user?: User;
  customerName?: string;
  customerContact?: string;
  date?: string;
  paymentMethod?: number;
  subtotal?: number;
  discountAmount?: number;
  grandTotal?: number;
  items?: Item[];
}
