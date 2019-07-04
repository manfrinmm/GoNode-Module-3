require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Youch = require("youch");
const validate = require("express-validation");
const databaseConfig = require("./config/database");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";

    this.database();
    this.middleswares();
    this.routes();
    this.exception();
  }

  database() {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }

  middleswares() {
    this.express.use(express.json()); //poder ler corpos de requisao em json
  }
  routes() {
    this.express.use(require("./routes"));
  }

  //erro na validação, cai aqui dentro
  //toda vez que um middleware tiver 4 parametros
  // o express sabe que este será usado para fazer
  // tratamento de erros
  exception() {
    this.express.use(async (err, req, res, next) => {
      //verifica se realmente é um erro de validação
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }

      if (process.env.NODE_ENV !== "production") {
        const youch = new Youch(err);

        return res.json(await youch.toJSON());
      }

      return res
        .status(err.status || 500)
        .json({ error: "Internal Server Error" });
    });
  }
}

module.exports = new App().express;
