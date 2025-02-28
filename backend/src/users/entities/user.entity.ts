import { Leaderboard } from 'src/leaderboard/entities/leaderboard.entity';
import { Result } from 'src/result/entities/result.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Token } from '../../auth/entities/token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, nullable: false })
  userName: string;

  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { nullable: false })
  password: string;

  @Column({ default: false })
    isVerified: boolean;
  
  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @OneToMany(() => Result, (result) => result.user, {
    cascade: true,
  })
  result: Result[];

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.user, {
    cascade: true,
    eager: true,
  })
  leaderboard: Leaderboard[];

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  leaderboards: Leaderboard[];

  @OneToMany(() => Result, (result) => result.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  results: Result[];

  @Column('varchar', { length: 225, nullable: true })
  googleId?: string

  @Column({ nullable: true })
  lastActivityAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
