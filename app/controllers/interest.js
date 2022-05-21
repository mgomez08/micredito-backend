const { Interest, Bank, Service } = require("../models/index");

const createInterest = async (req, res) => {
  try {
    const { id_bank, id_service, tasa_men, tasa_anu } = req.body;
    if (!id_bank || !id_service || !tasa_men || !tasa_anu) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }

    const interest = await Interest.create({
      id_bank,
      id_service,
      tasa_men,
      tasa_anu,
    });

    return res.status(200).send({
      ok: true,
      msg: "Tasas de interés creadas correctamente",
      data: interest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Error al crear las tasas de interés",
    });
  }
};

const editInterest = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_bank, id_service, tasa_men, tasa_anu } = req.body;
    const interest = await Interest.findByPk(id);
    if (!interest) {
      return res.status(400).send({
        ok: false,
        msg: "Las tasas de interés por este id no existen.",
      });
    }
    if (!id_bank || !id_service || !tasa_men || !tasa_anu) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }
    await interest.update({
      id_bank,
      id_service,
      tasa_men,
      tasa_anu,
    });

    return res.status(200).send({
      ok: true,
      msg: "Tasas de interés editadas correctamente",
      data: interest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Error al editar las tasas de interés",
    });
  }
};

const deleteInterest = async (req, res) => {
  try {
    const { id } = req.params;
    const interest = await Interest.findByPk(id);
    if (!interest) {
      return res.status(400).send({
        ok: false,
        msg: "Las tasas de interés por este id no existen.",
      });
    }
    await interest.destroy();
    return res.status(200).send({
      ok: true,
      msg: "Tasas de interés eliminadas correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Error al eliminar las tasas de interés",
    });
  }
};

const getAllInterests = async (req, res) => {
  try {
    const interests = await Interest.findAll({
      include: [
        { model: Bank, attributes: ["id", "name_bank"] },
        { model: Service, attributes: ["id", "name_service"] },
      ],
    });
    return res.status(200).send({
      ok: true,
      msg: "Tasas de interés obtenidas correctamente",
      data: interests,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Error al obtener las tasas de interés",
    });
  }
};

const getInterest = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      ok: false,
      msg: "El id es obligatorio",
    });
  }
  try {
    const interest = await Interest.findByPk(id);
    if (!interest) {
      return res.status(400).send({
        ok: false,
        msg: "Las tasas de interés con este id no existe",
      });
    }
    return res.status(200).send({
      ok: true,
      msg: "Tasas de interés obtenidas correctamente",
      data: interest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Error al obtener las tasas de interés",
    });
  }
};
module.exports = {
  createInterest,
  editInterest,
  deleteInterest,
  getAllInterests,
  getInterest,
};
