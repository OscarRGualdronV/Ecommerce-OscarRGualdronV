import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Order } from "src/orders/entities/order.entity";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({length: 50, nullable: false})
    name: string;

    @Column({length: 50, unique: true, nullable: false})
    email: string;

    @Column({length: 20, nullable: false})
    password: string;

    @Column('text', {nullable: true})
    address: string;
    
    @Column('bigint', {nullable: true})
    phone: string;

    @Column({length: 50, nullable: true})
    country: string;

    @Column({length: 50, nullable: true})
    city: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}
