import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Country } from "./country.entity";

@Entity()
export class City {

    @PrimaryGeneratedColumn('increment')
    code: number;

    @Column()
    name?: string;

    @ManyToOne(() => Country)
    @JoinColumn({ name: 'country_code' })
    country?: Country;
}