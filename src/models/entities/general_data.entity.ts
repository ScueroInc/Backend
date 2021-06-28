import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class GeneralData {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    description: string;

    @Column()
    value: number;

    @Column({
        nullable: false,
        default: () => 'DATE_ADD(NOW(), INTERVAL 2 HOUR)',
        type: 'timestamp',
    })
    created_at: Date;
}