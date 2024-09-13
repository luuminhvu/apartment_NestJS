import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Posts } from './posts.model';

dotenv.config();

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  firstName!: string;

  @Column(DataType.STRING)
  lastName!: string;

  @Column(DataType.DATE)
  dateOfBirth?: Date;

  @Column(DataType.STRING)
  phoneNumber?: string;

  @Column({
    type: DataType.ENUM('tenant', 'landlord', 'manager', 'admin'),
    defaultValue: 'tenant',
  })
  userType!: 'tenant' | 'landlord' | 'manager' | 'admin';
  @HasMany(() => Posts) // Quan hệ 1 - nhiều với bảng Post
  posts!: Posts[];

  public generateAuthToken(): string {
    const payload = { id: this.id, email: this.email, type: this.userType };
    return jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '1h',
    });
  }

  public generateRefreshToken(): string {
    const payload = { id: this.id, email: this.email, type: this.userType };
    return jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET || 'your_refresh_secret',
      { expiresIn: '7d' },
    );
  }
}
