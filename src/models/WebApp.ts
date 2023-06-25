import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
} from 'typeorm';

// models
import { UserProfile } from './UserProfile';

@Entity()
export class WebApp {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ unique: true, nullable: false })
    domain: string;

  @Column({ nullable: false, unique: true })
    accessToken: string;

  @Column()
    info: string;

  @ManyToOne(() => UserProfile, (userProfile) => userProfile.webApps)
  @JoinColumn({ name: 'userProfileId' })
    userProfile: UserProfile;
}
