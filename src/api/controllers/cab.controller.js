const logger = require('../../config/logger');
const Cab = require('../models/cab.model');

/**
 * @api {get} /cabs Get all cabs
 * @apiName GetAllCabs
 * @apiGroup Cab
 *
 * @apiSuccess {Object[]} cabs List of cabs.
 * @apiSuccess {String} cabs._id Cab ID.
 * @apiSuccess {String} cabs.cabRegistrationNumber Cab registration number.
 * @apiSuccess {String} cabs.cabModel Cab model.
 * @apiSuccess {String} cabs.cabColour Cab colour.
 *
 * @apiError (500) {String} error Internal server error.
 */
const getAllCabs = async (req, res) => {
  try {
    const cabs = await Cab.find();
    res.json(cabs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * @api {get} /cabs/:id Get cab by ID
 * @apiName GetCabById
 * @apiGroup Cab
 *
 * @apiParam {String} id Cab ID.
 *
 * @apiSuccess {String} _id Cab ID.
 * @apiSuccess {String} cabRegistrationNumber Cab registration number.
 * @apiSuccess {String} cabModel Cab model.
 * @apiSuccess {String} cabColour Cab colour.
 *
 * @apiError (404) {String} error Cab not found.
 * @apiError (500) {String} error Internal server error.
 */
const getCabById = async (req, res) => {
  const { id } = req.params;
  try {
    const cab = await Cab.findById(id);
    if (cab) {
      res.json(cab);
    } else {
      res.status(404).json({ error: 'Cab not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * @api {post} /cabs Create a new cab
 * @apiName CreateCab
 * @apiGroup Cab
 *
 * @apiParam {String} cabRegistrationNumber Cab registration number.
 * @apiParam {String} cabModel Cab model.
 * @apiParam {String} cabColour Cab colour.
 *
 * @apiSuccess (201) {String} _id Cab ID.
 * @apiSuccess {String} cabRegistrationNumber Cab registration number.
 * @apiSuccess {String} cabModel Cab model.
 * @apiSuccess {String} cabColour Cab colour.
 *
 * @apiError (500) {String} error Internal server error.
 */
const createCab = async (req, res) => {
  const { cabRegistrationNumber, cabModel, cabColour } = req.body;
  logger.info(cabRegistrationNumber);
  console.log(cabModel);
  try {
    const cab = await Cab.create({
      cabRegistrationNumber,
      cabModel,
      cabColour,
    });
    res.status(201).json(cab);
  } catch (error) {
    logger.info(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * @api {put} /cabs/:id Update cab by ID
 * @apiName UpdateCab
 * @apiGroup Cab
 *
 * @apiParam {String} id Cab ID.
 * @apiParam {String} [cabRegistrationNumber] Cab registration number.
 * @apiParam {String} [cabModel] Cab model.
 * @apiParam {String} [cabColour] Cab colour.
 *
 * @apiSuccess {String} _id Cab ID.
 * @apiSuccess {String} cabRegistrationNumber Cab registration number.
 * @apiSuccess {String} cabModel Cab model.
 * @apiSuccess {String} cabColour Cab colour.
 *
 * @apiError (404) {String} error Cab not found.
 * @apiError (500) {String} error Internal server error.
 */
const updateCab = async (req, res) => {
  const { id } = req.params;
  const { cabRegistrationNumber, cabModel, cabColour } = req.body;
  try {
    const cab = await Cab.findByIdAndUpdate(
      id,
      { cabRegistrationNumber, cabModel, cabColour },
      { new: true },
    );
    if (cab) {
      res.json(cab);
    } else {
      res.status(404).json({ error: 'Cab not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * @api {delete} /cabs/:id Delete cab by ID
 * @apiName DeleteCab
 * @apiGroup Cab
 *
 * @apiParam {String} id Cab ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (404) {String} error Cab not found.
 * @apiError (500) {String} error Internal server error.
 */
const deleteCab = async (req, res) => {
  const { id } = req.params;
  try {
    const cab = await Cab.findByIdAndDelete(id);
    if (cab) {
      res.json({ message: 'Cab deleted successfully' });
    } else {
      res.status(404).json({ error: 'Cab not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllCabs,
  getCabById,
  createCab,
  updateCab,
  deleteCab,
};
