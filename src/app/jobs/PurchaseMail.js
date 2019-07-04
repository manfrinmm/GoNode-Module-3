const Mail = require("../services/Mail");

class PurchaseMail {
  get key() {
    return "PurchaseMail";
  }
  //ele quem vai enviar o email
  async handle(job, done) {
    const { ad, user, content } = job.data;

    await Mail.sendMail({
      from: '"Market"<Market@nãoexiste.com>',
      to: ad.author.email,
      subject: "Solicitação de compra: " + ad.title,
      template: "purchase",
      context: { user, content, ad }
    });

    //para finalizar e avsar ao job que terminou
    return done();
  }
}
module.exports = new PurchaseMail();
