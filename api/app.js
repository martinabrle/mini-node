const appPort = process.env.PORT || 3000;
const dbConnectionString = process.env.DB_CONNECTION_STRING;

import Sequelize from "sequelize";
const sequelize = new Sequelize(dbConnectionString);

import {DB as DB} from "./db/db.js";

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
  process.exitCode = 1;
  process.exit();
});

const db = DB.init(sequelize, Sequelize);
export default db;

import express, { json } from 'express';
const app = express();

try {
  app.use(json());
  app.listen(appPort, () => console.log(`App is listening on port ${appPort}!`));
}
catch(err) {
  console.error(err.message);
  console.error(`Unable to start the Node.js server on ${appPort}!`);
  process.exitCode = 1;
  process.exit();
}

app.get('/', async (req, res) => {
  try {
     res.send(`Example application here`);
   } catch(error) {
     console.error(error);
   }});

app.get('/words', async (req, res) => {
  try {
    const wordCollection = await db.WordModel.findAll();
    res.json({ words: wordCollection })
    } catch(error) {
      console.error(error);
    }
});

app.get('/basket', async (req, res) => {
  try {
    const basketLineCollection = await db.BasketLineModel.findAll();
    res.json({ basket: basketLineCollection })
  } catch(error) {
    console.error(error);
  }
});

app.get('/inventory', async (req, res) => {
  try {
    const inventoryCollection = await db.InventoryModel.findAll();
    res.json({ inventory: inventoryCollection })
  } catch(error) {
    console.error(error);
  }
});

app.post('/inventory', async (req, res) => {
  try {
    const newItem = Inventory.create(req.body);
    await newItem.save();
    res.json({ inventory: newItem })
  } catch(error) {
    console.error(error);
  }});

app.get('/api/health', async (req, res) => {
  try {
    await sequelize.query("SELECT 1+1 AS health_check_result");
    res.sendStatus(200);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/api/warmup', async (req, res) => {
  try {
    await db.InventoryModel.findAll();
    await db.WordModel.findAll();
    await db.BasketLineModel.findAll();
    res.sendStatus(200);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
});

/*
app.post('/inventory', async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    await newItem.save();
    res.json({ inventory: newItem })
  } catch(error) {
    console.error(error);
  }});

app.get('/inventory/:id', async (req, res) => {
   const id = req.params.id
   try {
      const inventory = await Inventory.findAll( { attributes: ['id', 'name', 'quantity', 'date'], where: { id: id }});
      res.json({ inventory });
    } catch(error) {
      console.error(error);
    }});
*/