import { Category } from 'src/category/entities/category.entity';
import { OrderDetail } from 'src/orders/entities/order.detail.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { Order } from 'src/orders/entities/order.entity';



@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ length: 50, nullable: false })
    name: string;

    @Column('text', { nullable: false })
    description: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number;

    @Column('int', { nullable: false })
    stock: number;

    @Column('text', {default: ''})
    imgUrl: string;

    @ManyToOne(() => Category, (category) => category.products, { nullable: false })
    @JoinColumn()
    category: Category;

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    orderDetails: OrderDetail[]

    @ManyToMany(() => Order, (order) => order.products)
    orders: Order[];
}
