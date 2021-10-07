import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Data extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  data: string

  @Column({ default: false })
  processed: boolean
}
