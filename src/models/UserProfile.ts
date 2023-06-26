import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// models
import { WebApp } from './WebApp';

@Entity()
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ unique: true, nullable: false })
    email: string;

  @Column({ nullable: false })
    password: string;

  @Column()
    firstName: string;

  @Column()
    lastName: string;

  @Column()
    avatar: string;

  @OneToMany(() => WebApp, (webApp) => webApp.userProfile, { cascade: ['remove'] })
    webApps: WebApp[];

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}
