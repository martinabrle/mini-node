import { Word as Word } from "../models/word.js";
import { Inventory as Inventory } from "../models/inventory.js";
import { BasketLine as BasketLine } from "../models/basketLine.js";


class DB {
    static init(sequelize, Sequelize) {
        const models = {
            WordModel: Word.init(sequelize, Sequelize),
            InventoryModel: Inventory.init(sequelize, Sequelize),
            BasketLineModel: BasketLine.init(sequelize, Sequelize)
          };
        
        models.WordModel.hasMany( models.InventoryModel, { as: "inventory", foreignKey: 'wordId', sourceKey: 'id'} );
        models.InventoryModel.belongsTo( models.WordModel, { as: "word", foreignKey: 'wordId', sourceKey: 'id'} );

        models.WordModel.hasMany( models.BasketLineModel, { as: "basketLines", foreignKey: 'wordId', sourceKey: 'id'} );
        models.BasketLineModel.belongsTo( models.WordModel, { as: "word", foreignKey: 'wordId', sourceKey: 'id'} );
        
        const db = {
            ...models,
            sequelize
          };
        return db;        
    }
}

export { DB };