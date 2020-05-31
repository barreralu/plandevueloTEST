const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User } = require('../models');

const getUser = async (req, res) => {
  try {
    if (req.params.id) {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user)
        return res
          .status(400)
          .json({ success: false, error: { name: 'UserNotFound', message: 'No se encontró el usuario solicitado.' } });
      return res.status(200).json({ success: true, user: user });
    }
    const users = await User.findAll();
    if (users.length === 0)
      return res.status(400).json({
        success: false,
        error: { name: 'UsersNotFound', message: 'No se encontró ningún usuario en la búsqueda.' },
      });
    return res.status(200).json({ success: true, user: users });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getSearchUser = async (req, res) => {
  try {
    if (Object.keys(req.query).length === 0)
      return res.status(400).json({
        success: false,
        error: {
          name: 'InsufficientSearchItems',
          message: 'El número de parámetros para la búsqueda no puede ser igual a cero.',
        },
      });
    const where = [];
    if (typeof req.query.id !== 'undefined') {
      const ops = { id: req.query.id };
      where.push(ops);
    }
    if (typeof req.query.user !== 'undefined') {
      const ops = {
        [Op.or]: [
          { user: { [Op.like]: '%' + req.query.user + '%' } },
          { email: { [Op.like]: '%' + req.query.user + '%' } },
        ],
      };
      where.push(ops);
    }
    if (where.length === 0)
      return res.status(400).json({
        success: false,
        error: {
          name: 'InvalidSearchItems',
          message: 'Los parámetros enviados para la búsqueda no son válidos con los criterios disponibles.',
        },
      });
    const users = await User.findAll({ where });
    if (users.length === 0)
      return res.status(400).json({
        success: false,
        error: {
          name: 'UsersNotFound',
          message: 'No se encontró ningún usuario en la búsqueda.',
        },
      });

    return res.status(200).json({ success: true, user: users });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.user || !req.body.password)
      return res.status(400).json({
        success: false,
        error: {
          name: 'InsufficientData',
          message: 'Por favor verifique los datos enviados, faltan elementos para la creación de un usuario.',
        },
      });
    const user = await User.create(req.body, { fields: ['firstName', 'lastName', 'email', 'user', 'password'] });
    if (!user)
      return res.status(400).json({
        success: false,
        error: {
          name: 'UserNotFound',
          message: 'Ocurrió un problema al crear el usuario.',
        },
      });
    return res.status(201).json({ success: true, message: 'Nuevo usuario creado correctamente.', user });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({
        success: false,
        error: {
          name: 'InsufficientParameters',
          message: 'Por favor envié el parámetro id de usuario necesario para la actualización.',
        },
      });
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.user)
      return res.status(400).json({
        success: false,
        error: {
          name: 'InsufficientData',
          message: 'Por favor envié los datos necesarios para realizar la actualización del usuario.',
        },
      });
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user)
      return res
        .status(400)
        .json({ success: false, error: { name: 'UserNotFound', message: 'No se encontró el usuario solicitado.' } });
    await user.set(req.body);
    await user.save();
    return res.status(200).json({ success: true, message: 'Usuario actualizado correctamente.', user });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({
        success: false,
        error: {
          name: 'InsufficientParameters',
          message: 'Por favor envié el parámetro id de usuario necesario para la eliminación.',
        },
      });
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user)
      return res
        .status(400)
        .json({ success: false, error: { name: 'UserNotFound', message: 'No se encontró el usuario solicitado.' } });
    await user.destroy();
    return res.status(200).json({ succes: true, message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  getUser,
  getSearchUser,
  createUser,
  updateUser,
  deleteUser,
};
