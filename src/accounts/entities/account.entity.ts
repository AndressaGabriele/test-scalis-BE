import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  userName: string;

  @Column({ type: 'float', default: 0 })
  checking: number;

  @Column({ type: 'float', default: 0 })
  savings: number;
}
