import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "../../users/entities/user.entity";
import { OrderDetail } from "./order.detail.entity";
import { Product } from "src/products/entities/product.entity";

@Entity({name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @OneToOne(() => OrderDetail)
    @JoinColumn()
    orderDetail: OrderDetail;

    @ManyToMany(() => Product, (product) => product.orders)
    @JoinTable() 
    products: Product[];
}
