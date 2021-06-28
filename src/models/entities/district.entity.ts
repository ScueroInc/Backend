import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class District {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    dangerous_hours: string;
}