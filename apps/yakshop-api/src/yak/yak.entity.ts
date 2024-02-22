import { YakSex } from 'shared-types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Yak {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ enum: YakSex })
  sex: YakSex;

  @Column({ type: 'float' })
  age: number;
}
