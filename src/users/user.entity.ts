import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type UserRole = 'admin' | 'user';

export const USER_ROLES = {
  ADMIN: 'admin' as UserRole,
  USER: 'user' as UserRole,
} as const;

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 10, default: 'user' })
  role: UserRole;

  @Column({ type: 'json', nullable: true, default: null })
  favoriteStations: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
