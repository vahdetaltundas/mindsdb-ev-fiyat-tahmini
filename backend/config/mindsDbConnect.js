const MindsDB = require("mindsdb-js-sdk").default;
require("dotenv").config();
const mindsDbHost=process.env.MINDSDB_HOST;

async function connectToMindsDB() {
    try {
      await MindsDB.connect({
        host: mindsDbHost,
      });
      console.log("Successfully connected to MindsDB!");
    } catch (error) {
      console.error("Failed to connect to local instance:", error);
    }
}
module.exports=connectToMindsDB();