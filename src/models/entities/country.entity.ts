import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Country {

    @PrimaryGeneratedColumn('increment')
    code: number;

    @Column()
    name: string;

    @Column()
    continent_name: string;
}