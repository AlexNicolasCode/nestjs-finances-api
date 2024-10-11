import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('users')
export class UserEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    password: string;
}