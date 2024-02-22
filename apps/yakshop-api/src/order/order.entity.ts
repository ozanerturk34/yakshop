import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer: string;

  @Column({ nullable: true })
  milk: number;

  @Column({ nullable: true })
  skins: number;
}
