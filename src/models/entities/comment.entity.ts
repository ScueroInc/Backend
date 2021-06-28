import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { GeneralData } from "./general_data.entity";
import { User } from "./user.entity";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    comment_detail: string;

    @Column()
    starts: number;

    @ManyToOne(() => GeneralData)
    @JoinColumn({ name: 'comment_type' })
    comment_type: GeneralData;

    @Column({
        nullable: false,
        default: () => 'DATE_ADD(NOW(), INTERVAL 2 HOUR)',
        type: 'timestamp',
    })
    created_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    created_by: User;
}