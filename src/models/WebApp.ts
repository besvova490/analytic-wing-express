import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// models
import { UserProfile } from './UserProfile';
import { Event } from './Event';

@Entity()
export class WebApp extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ unique: true, nullable: false })
    domain: string;

  @Column()
    info: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @ManyToOne(() => UserProfile, (userProfile) => userProfile.webApps)
  @JoinColumn({ name: 'userProfileId' })
    userProfile: UserProfile;

  @OneToMany(() => Event, (event) => event.webApp, { cascade: ['remove'] })
    events: Event[];
}
