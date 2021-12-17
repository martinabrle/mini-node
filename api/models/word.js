import { Sequelize } from "sequelize";

export class Word extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true
                },
                term: {
                    type: DataTypes.STRING(50),
                    allowNull: false
                },
                explanation: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                formClass: {
                    type: DataTypes.STRING(10),
                    allowNull: false,
                    map: "formclass"
                }
            }, {
                sequelize,
                tableName: "word",
                freezeTableName: true,
                timestamps: true
            });
    }
}
