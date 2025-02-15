import {
  Entity, PrimaryGeneratedColumn,
  Column, CreateDateColumn,
  UpdateDateColumn, Index,
  ManyToOne,
  OneToMany
} from 'typeorm';

import { User } from './User';
import { Item } from './Item';

export enum FolderState {
  OPEN = "open",
  CLOSED = "closed"
}

@Entity({ name: "folders" })
@Index(['created_at'])
export class Folder {
  
  @PrimaryGeneratedColumn('increment',{ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  name: string

  @Column({
    type: "enum",
    enum: FolderState,
    default: FolderState.CLOSED
  })
  state: FolderState

  @Column({ type: 'int', default: 0 })
  position: number

  @ManyToOne(() => User, (user) => user.folders, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Item, (item) => item.folder)
  items: Item;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;  


}