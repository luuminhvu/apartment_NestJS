import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model'; // Đảm bảo đường dẫn chính xác tới file User

@Table({ tableName: 'posts' })
export class Posts extends Model<Posts> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  content!: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number; // Khóa ngoại liên kết tới bảng User

  @BelongsTo(() => User) // Quan hệ thuộc về User
  user!: User;
}
