const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const exphbs = require("express-handlebars");
const mailConfig = require("../../config/mail");

const transport = nodemailer.createTransport(mailConfig);

//passr o diretorio de views relacionado a emails
const viewPath = path.resolve(__dirname, "..", "views", "emails");

//configurar a maneiro como o nodemailer lida com templates de email
transport.use(
  "compile",
  hbs({
    viewEngine: exphbs.create({
      partialsDir: path.resolve(viewPath, "partials"),
      defaultLayout: null
    }),
    viewPath,
    extName: ".hbs"
  })
);
module.exports = transport;
