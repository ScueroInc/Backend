import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { City } from "./city.entity";
import { User } from "./user.entity";

@Entity()
export class Person {

    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    born_date: Date;

    @Column()
    address: string;

    @Column()
    document_type: number;

    @Column()
    document_number: string;

    @Column()
    gender: string;

    @OneToOne(() => User, user => user.person, { cascade: true })
    user: User;

    @ManyToOne(() => City, { cascade: true })
    @JoinColumn({ name: 'city_code' })
    city: City;
}