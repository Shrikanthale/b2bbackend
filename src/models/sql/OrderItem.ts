import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../utils/database';

// Optional ID when creating new entries
interface OrderItemAttributes {
    id: number;
    orderId: number;
    productId: string; // Mongo ObjectId stored as string
    name: string;
    price: number;
    quantity: number;
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id'> { }

class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes>
    implements OrderItemAttributes {
    public id!: number;
    public orderId!: number;
    public productId!: string;
    public name!: string;
    public price!: number;
    public quantity!: number;
}

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        orderId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        quantity: DataTypes.INTEGER,
    },
    {
        sequelize,
        modelName: 'orderItem',
        tableName: 'order_items',
        timestamps: true,
    }
);

export default OrderItem;
