import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../utils/database';

// Step 1: Define attributes
interface OrderAttributes {
    id: number;
    userId: number;
}

// Step 2: Optional for creation (id auto-incremented)
interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> { }

// Step 3: Extend the model with types
class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: number;
    public userId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Step 4: Define the actual model
Order.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'order',
    timestamps: true,
});

export default Order;
