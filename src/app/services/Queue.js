const kue = require("kue");
const redisConfig = require("../../config/redis");
const jobs = require("../jobs");

const Queue = kue.createQueue({ redis: redisConfig });

//processar a fila para todos os jobs que tiver a key e chamando o metodo, que ira finalizar o jobs(nesse caso)
Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle);

module.exports = Queue;
