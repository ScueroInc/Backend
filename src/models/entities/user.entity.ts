import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Person } from "./person.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column({ nullable: true })
    photo: string;

    @Column({ nullable: true })
    trip_id: number;

    @OneToOne(() => Person, person => person.user, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'person_id' })
    person: Person;
}