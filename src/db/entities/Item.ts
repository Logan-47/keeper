import { 
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { Folder } from "./Folder";
import { User } from "./User";

@Entity({ name: 'items' })
@Index(['created_at'])
export class Item {

  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({nullable: false})
  name: string

  @Column()
  icon: string

  @Column({ type: 'int', default: 0 })
  position: number

  // null if not folder is associated
  @ManyToOne(() => Folder, (folder) => folder.items, { nullable: true, onDelete: "CASCADE" })
  folder: Folder | null; 

  @ManyToOne(() => User, (user) => user.items, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at: Date;
  
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;
  item: { id: number; };
}