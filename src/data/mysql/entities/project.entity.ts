import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SqlProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: false })
  description!: string;

  @Column({ nullable: false })
  charge!: string;

  @Column({ nullable: false })
  techs!: string;

  @Column("json", { nullable: false })
  image!: { id: string; url: string };

  @Column({ nullable: false })
  projectUrl!: string;
}
