import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  GHOST = 'ghost'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser!: number;

  @Column()
  name!: string;

  @Column({
    unique: true
  })
  email!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GHOST
  })
  role!: UserRole;

  @Column({
    type: 'int',
    default: 0
  })
  isVerified!: number;
}
