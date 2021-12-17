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
        
        Object.values(models)
          .filter(model => typeof model.associate === "function")
          .forEach(model => model.associate(models));
        
        const db = {
            ...models,
            sequelize
          };
        
        return db;        
    }
}

export { DB };