import {
  Entity, PrimaryGeneratedColumn,
  Column, CreateDateColumn,
  UpdateDateColumn, Index,
  ManyToOne
} from 'typeorm';

import { User } from './User'

@Entity({ name: 'user_sessions' })
@Index(['created_at'])
export class UserSession {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;
  
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE', eager: true })
  user: User;
  
  @Index()
  @Column({ nullable: false })
  token: string;
  
  @Index()
  @Column({ nullable: false })
    expiry: Date;


  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated_at: Date;
}