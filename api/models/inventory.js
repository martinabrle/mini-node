import { Sequelize } from "sequelize";
import { Word } from "./word.js";

export class Inventory extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true
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
                tableName: "inventory",
                freezeTableName: true,
                timestamps: true
            });
    }
}
