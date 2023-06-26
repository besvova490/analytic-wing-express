import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

// models
import { WebApp } from './WebApp';

enum EventType {
  click = 'click',
  page_view = 'page_view',
}

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'enum', enum: EventType, nullable: false })
    event: string;

  @Column({ nullable: true, type: 'simple-json' })
    data: { [key: string]: string | number };

  @CreateDateColumn()
    createdAt: Date;

  @ManyToOne(() => WebApp, (webApp) => webApp.events)
  @JoinColumn({ name: 'webAppId' })
    webApp: WebApp;
}
