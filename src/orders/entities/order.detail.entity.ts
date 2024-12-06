import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Order } from "./order.entity";
import { Product } from "../../products/entities/product.entity";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    price: number;

    @OneToOne(() => Order)
    order: Order;

    @ManyToMany(() => Product, (product) => product.orderDetails)
    @JoinTable()
    products: Product[]
}