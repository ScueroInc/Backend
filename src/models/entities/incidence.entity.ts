import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Comment } from "./comment.entity";
import { GeneralData } from "./general_data.entity";
import { User } from "./user.entity";

@Entity()
export class Incidence {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    address: string;

    @ManyToOne(() => GeneralData)
    @JoinColumn({ name: 'incidence_type' })
    incidence_type: GeneralData;

    @Column()
    incidence_value: number;

    @Column()
    mitigance: boolean;

    @OneToOne(() => Comment)
    @JoinColumn({ name: 'comment_id' })
    comment_id: Comment;

    @Column({
        nullable: false,
        default: () => 'DATE_ADD(NOW(), INTERVAL 2 HOUR)',
        type: 'timestamp',
    })
    created_at: Date;
}