const appPort = process.env.PORT || 3000;
const dbConnectionString = process.env.DB_CONNECTION_STRING;

import { Sequelize, QueryTypes } from "sequelize";

const sequelize = new Sequelize(dbConnectionString);

import { DB as DB } from "./db/db.js";

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exitCode = 1;
    process.exit();
  });

const db = DB.init(sequelize, Sequelize);
export default db;

import express, { json } from "express";
const app = express();

try {
  app.use(json());
  app.listen(appPort, () =>
    console.log(`App is listening on port ${appPort}!`)
  );
} catch (err) {
  console.error(err.message);
  console.error(`Unable to start the Node.js server on ${appPort}!`);
  process.exitCode = 1;
  process.exit();
}

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.js";
import { Word } from "./models/word.js";
import { Inventory } from "./models/inventory.js";

var options = {
  explorer: true,
};

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.get("/", async (req, res) => {
  try {
    res.redirect("/swagger");
  } catch (error) {
    console.error(error);
    res.send(
      "Simple Node.js API - proceed to /swagger for more doccumentation."
    );
  }
});

app.get("/api/words/:id?:term?", async (req, res) => {
  const wordFilter = req.query.id;
  const termFilter = req.query.term;

  try {
    let wordCollection = [];
    if (
      wordFilter !== undefined &&
      wordFilter !== 0 &&
      `${wordFilter}` !== ""
    ) {
      wordCollection = await db.WordModel.findAll({
        where: {
          id: wordFilter,
        },
      });
    } else if (termFilter !== undefined && termFilter !== "") {
      wordCollection = await db.WordModel.findAll({
        where: {
          term: termFilter,
        },
      });
    } else {
      wordCollection = await db.WordModel.findAll();
    }
    res.json({ words: wordCollection });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/api/words", async (req, res) => {
  try {
    const newWord = Word.build(req.body);
    if (newWord.term === undefined || newWord.term === "") {
      res.status(400).send("Field 'term' is manadatory.");
      return;
    }
    if (newWord.formClass === undefined || newWord.formClass === "") {
      res.status(400).send("Field 'formClass' is manadatory.");
      return;
    }
    if (newWord.explanation === undefined || newWord.explanation === "") {
      res.status(400).send("Field 'explanation' is manadatory.");
      return;
    }
    await newWord.save();
    res.json({ word: newWord });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});


app.delete("/api/words/:id", async (req, res) => {
  try {
    const wordId = req.path.id;
    if (wordId === undefined || wordId === 0) {
      res.status(400).send("Parameter 'wordId' is manadatory.");
      return;
    }
    await db.WordModel.delete({ where: { id: wordId } });
    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.patch("/api/words/:id?", async (req, res, next) => {
  const wordIdFilter = req.params.id;
  if (wordIdFilter === undefined || wordIdFilter.length === "") {
    res.status(400).send("Parameter 'id' is manadatory.");
    return;
  }
  const explanation = req.body.explanation;
  if (explanation === undefined || explanation === "") {
    res.status(400).send("Parameter 'explanation' is manadatory.");
    return;
  }
  const formClass = req.body.formClass;
  if (formClass === undefined || formClass === "") {
    res.status(400).send("Parameter 'formClass' is manadatory.");
    return;
  }

  try {
    const words = await db.WordModel.findAll({
      where: {
        id: wordIdFilter,
      }
    });
    if (words === undefined || words.length < 1) {
      res.status(400).send(`Word '${wordIdFilter}' does not exist.`);
      return;
    }
    let word = words[0];
    word.explanation = explanation;
    word.formClass = formClass;
    await word.save();
    res.json({ word: word });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/basket", async (req, res) => {
  try {
    const basketLineCollection = await db.BasketLineModel.findAll({
      include: [
        {
          model: db.WordModel,
          as: "word",
        }
      ]
    });
    res.json({ basket: basketLineCollection });
  } catch (error) {
    console.error(error);
  }
});

app.patch("/api/basket", async (req, res) => {
  const userId = req.params.userId;
  if (userId === undefined || userId === "") {
    res.status(400).send("Parameter 'userId' is manadatory.");
    return;
  }
  const wordId = req.params.wordId;
  if (wordId === undefined || wordId === 0) {
    res.status(400).send("Parameter 'wordId' is manadatory.");
    return;
  }
  const qty = req.params.qty;
  if (qty === undefined) {
    res.status(400).send("Field 'qty' is manadatory.");
    return;
  }

  try {
    if (qty === 0 || wordId === 0.0) {
      await db.BasketLineModel.delete({ where: { userId: userId, wordId: wordId } });
    } else {
      await db.BasketLineModel.create({ userId: userId, wordId: wordId, qty: qty });
    }
    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/inventory:id?:wordId?", async (req, res) => {
  const idFilter = req.query.id;
  const wordIdFilter = req.query.wordId;

  try {
    let inventoryCollection = [];
    if (idFilter !== undefined && idFilter !== 0 && `${idFilter}` !== "") {
      inventoryCollection = await db.InventoryModel.findAll({
        where: {
          id: idFilter,
        },
        include: [
          {
            model: db.WordModel,
            as: "word",
          }
        ]
      });
    } else if (
      wordIdFilter !== undefined &&
      wordIdFilter !== 0 &&
      `${wordIdFilter}` !== ""
    ) {
      inventoryCollection = await db.InventoryModel.findAll({
        where: {
          wordId: wordIdFilter,
        },
        include: [
          {
            model: db.WordModel,
            as: "word",
          }
        ]
      });
    } else {
      inventoryCollection = await db.InventoryModel.findAll({
        include: [
          {
            model: db.WordModel,
            as: "word",
          }
        ]
      });
    }

    res.json({ inventory: inventoryCollection });
  } catch (error) {
    console.error(error);
  }
});

app.patch("/api/inventory", async (req, res) => {
  const idFilter = req.query.id;
  const wordIdFilter = req.query.wordId;
  const qtyDelta = req.body.qty;

  if (
    qtyDelta === undefined ||
    qtyDelta === "" ||
    qtyDelta === 0 ||
    qtyDelta === 0.0
  ) {
    res.status(400).send("Field 'qty' is mandatory");
    return;
  }
  try {
    let inventoryCollection = [];
    if (wordIdFilter !== undefined && wordIdFilter !== 0) {
      const [results, metadata] = await sequelize.query(
        `UPDATE "inventory" SET "qty" = "qty" + :qtyDeltaParm WHERE "wordId"=:wordIdParm`,
        {
          replacements: {
            qtyDeltaParm: qtyDelta,
            wordIdParm: wordIdFilter,
          },
          type: QueryTypes.UPDATE,
        }
      );
      if (metadata === 0) {
        await db.InventoryModel.create({ wordId: wordIdFilter, qty: qtyDelta });
      }
      inventoryCollection = await db.InventoryModel.findAll({
        where: {
          wordId: wordIdFilter,
        },
        include: [
          {
            model: db.WordModel,
            as: "word",
          }
        ]
      });
    } else if (idFilter !== undefined && idFilter !== 0) {
      const [results, metadata] = await sequelize.query(
        `UPDATE "inventory" SET "qty" = "qty" + :qtyDeltaParm WHERE "id"=:id`,
        {
          replacements: { qtyDeltaParm: qtyDelta, id: idFilter },
          type: QueryTypes.DDL,
        }
      );
      inventoryCollection = await db.InventoryModel.findAll({
        where: {
          id: idFilter,
        },
        include: [
          {
            model: db.WordModel,
            as: "word",
          }
        ]
      });
    } else {
      res
        .status(400)
        .send("Providing query parameters 'id' or 'wordId' is mandatory");
      return;
    }

    res.json({ inventory: inventoryCollection });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/health/ping", async (req, res) => {
  try {
    await sequelize.query("SELECT 1+1 AS health_check_result");
    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/health/warmup", async (req, res) => {
  try {
    await db.InventoryModel.findAll();
    await db.WordModel.findAll();
    await db.BasketLineModel.findAll();
    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
