import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// models
import { WebApp } from './WebApp';

@Entity()
export class WepAppFeedback extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ unique: true, nullable: false })
    userId: string;

  @Column({ nullable: false })
    feedback: string;

  @Column({ nullable: false })
    email: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @ManyToOne(() => WebApp, (webApp) => webApp.events)
  @JoinColumn({ name: 'webAppId' })
    webApp: WebApp;
}
