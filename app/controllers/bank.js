const { Bank } = require("../models/index");

const createBank = async (req, res) => {
  try {
    const { name_bank } = req.body;

    if (!name_bank) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }

    if (name_bank.length < 3) {
      return res.status(400).send({
        ok: false,
        msg: "El nombre del banco debe tener al menos 3 caracteres",
      });
    }

    const bank = await Bank.create({
      name_bank,
    });

    return res.status(200).send({
      ok: true,
      msg: "Banco creado correctamente",
      data: bank,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Error al crear el banco",
    });
  }
};

const editBank = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_bank } = req.body;
    const bank = await Bank.findByPk(id);

    if (!bank) {
      return res.status(400).send({
        ok: false,
        msg: "El banco con este id no existe",
      });
    }

    if (!name_bank) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }
    if (name_bank.length < 3) {
      return res.status(400).send({
        ok: false,
        msg: "El nombre del banco debe tener al menos 3 caracteres",
      });
    }
    await bank.update({
      name_bank,
    });

    return res.status(200).send({
      ok: true,
      msg: "Banco editado correctamente",
      data: bank,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Error al editar el banco",
    });
  }
};

const deleteBank = async (req, res) => {
  try {
    const { id } = req.params;
    const bank = await Bank.findByPk(id);

    if (!bank) {
      return res.status(400).send({
        ok: false,
        msg: "El banco con este id no existe",
      });
    }
    await bank.destroy();

    return res.status(200).send({
      ok: true,
      msg: "Banco eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Error al eliminar el banco",
    });
  }
};

const getAllBanks = async (req, res) => {
  try {
    const banks = await Bank.findAll();
    return res.status(200).send({
      ok: true,
      msg: "Bancos obtenidos correctamente",
      data: banks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Error al obtener los bancos",
    });
  }
};

const getBank = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      ok: false,
      msg: "El id es obligatorio",
    });
  }
  try {
    const bank = await Bank.findByPk(id);
    if (!bank) {
      return res.status(400).send({
        ok: false,
        msg: "El banco con este id no existe",
      });
    }
    return res.status(200).send({
      ok: true,
      msg: "Banco obtenido correctamente",
      data: bank,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Error al obtener el banco",
    });
  }
};

module.exports = {
  createBank,
  editBank,
  deleteBank,
  getAllBanks,
  getBank,
};
