import {
  Model,
  UUID,
  UUIDV4,
} from 'sequelize';

import User from './User';
import sequelize from '../db';

class Chatroom extends Model {
  public id!: string;
  public ownerId: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
Chatroom.init({
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'chatroom',
  timestamps: true,
  paranoid: true,
});

User.belongsTo(Chatroom, {
  as: 'owner',
});

export const getChatroomsByOwnerId = (Chatroom, ownerId) => {
  return Chatroom.findAll({
    where: {
      ownerId,
    },
  });
};

export default Chatroom;