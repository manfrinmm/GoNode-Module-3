const Ad = require("../models/Ad");
const User = require("../models/User");
const Purchase = require("../models/Purchase");
const PurchaseMail = require("../jobs/PurchaseMail");
const Queue = require("../services/Queue");

class PurchaseController {
  async store(req, res) {
    const { ad, content } = req.body;

    const purchaseAd = await Ad.findById(ad).populate("author");
    const user = await User.findById(req.userId);

    //verifica se já foi vendido
    if (purchaseAd.purchasedBy) {
      return res.status(401).json({ error: "Item já vendido" });
    }

    //Envia email
    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save();

    // //Salva intenção de compra
    const purchase = await Purchase.create({
      user: user.id,
      ad,
      author: purchaseAd.author._id
    });

    return res.status(200).json(purchase);
  }
}

module.exports = new PurchaseController();
