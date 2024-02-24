import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SqlUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false, unique: true })
  username!: string;

  @Column({ nullable: false })
  password!: string;
}
