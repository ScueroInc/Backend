import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Country } from "./country.entity";

@Entity()
export class City {

    @PrimaryGeneratedColumn('increment')
    code: number;

    @Column()
    name?: string;

    @OneToOne(() => Country)
    @JoinColumn({ name: 'country_code' })
    country?: Country;
}