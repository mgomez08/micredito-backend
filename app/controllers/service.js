const { Service } = require("../models/index");

const createService = async (req, res) => {
  try {
    const { name_service } = req.body;

    if (!name_service) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }
    if (name_service.length < 3) {
      return res.status(400).send({
        ok: false,
        msg: "El nombre del servicio debe tener al menos 3 caracteres",
      });
    }
    const service = await Service.create({
      name_service,
    });

    return res.status(200).send({
      ok: true,
      msg: "Servicio creado correctamente",
      data: service,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error al crear el servicio",
    });
  }
};

const editService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_service } = req.body;
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(400).send({
        ok: false,
        msg: "El servicio con este id no existe",
      });
    }
    if (!name_service) {
      return res.status(400).send({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }
    if (name_service.length < 3) {
      return res.status(400).send({
        ok: false,
        msg: "El nombre del servicio debe tener al menos 3 caracteres",
      });
    }
    await service.update({
      name_service,
    });

    return res.status(200).send({
      ok: true,
      msg: "Servicio editado correctamente",
      data: service,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error al editar el servicio",
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(400).send({
        ok: false,
        msg: "El servicio con este id no existe",
      });
    }
    await service.destroy();
    return res.status(200).send({
      ok: true,
      msg: "Servicio eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error al eliminar el servicio",
    });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    return res.status(200).send({
      ok: true,
      msg: "Servicios obtenidos correctamente",
      data: services,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error al obtener los servicios",
    });
  }
};
module.exports = {
  createService,
  editService,
  deleteService,
  getAllServices,
};
