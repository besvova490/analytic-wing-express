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
import { WepAppFeedback } from './WepAppFeedback';

@Entity()
export class WebApp extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ unique: true, nullable: false })
    url: string;

  @Column({ nullable: true })
    preview: string;

  @Column({ nullable: false })
    title: string;

  @Column({ nullable: false })
    metaTitle: string;

  @Column({ nullable: false })
    accessToken: string;

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

  @OneToMany(() => WepAppFeedback, (feedback) => feedback.webApp, { cascade: ['remove'] })
    feedbacks: WepAppFeedback[];
}
