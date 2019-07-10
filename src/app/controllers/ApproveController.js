const Ad = require("../models/Ad");
const Purchase = require("../models/Purchase");

class ApproveController {
  async show(req, res) {
    const IntensionAd = await Purchase.find({
      author: req.userId
    }).populate("ad");

    //Filtrar entre vendidos ou não.
    const Intensions = IntensionAd.filter(data => {
      if (!data.ad.purchasedBy) return data;
    });

    //Mostra todas as intenções de compra dos itens desse vendedor
    return res.status(200).json(Intensions);
  }

  async put(req, res) {
    const { id } = req.params;

    const { ad, user } = await Purchase.findById(id);

    const Add = await Ad.findById(ad);

    //verifica se já foi vendido
    if (Add.purchasedBy) {
      return res.status(401).json({ error: "Item já vendido" });
    }

    Add.purchasedBy = user;

    await Add.save();

    return res.status(200).json(Add);
  }
}

module.exports = new ApproveController();
