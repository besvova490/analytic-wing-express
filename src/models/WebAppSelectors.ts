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
export class WebAppSelector extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ nullable: false })
    selector: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @ManyToOne(() => WebApp, (webApp) => webApp.selectors)
  @JoinColumn({ name: 'webAppId' })
    webApp: WebApp;
}
