import { Sequelize } from "sequelize";
import { Word } from "./word.js";

export class BasketLine extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true
                },
                userId: {
                    type: DataTypes.STRING(355),
                    allowNull: false
                },
                wordId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Word,
                        key: 'id'
                    }
                },
                qty: {
                    type: DataTypes.DECIMAL(10,2),
                    allowNull: false
                }
            }, {
                sequelize,
                tableName: "basket_line",
                freezeTableName: true,
                timestamps: true
            });
    }
}
