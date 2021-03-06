const lookupsService = require('../services/lookups.service');

module.exports = {

  /**
   *  Get languages list
   * 
   * @returns {Object}
   * @public
   */
  getLanguages: (req, res) => {
    lookupsService
      .fetchLanguages()
      .then(async (data) => {
        res.send({
          success: true,
          data
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: err
        });;
      });
  },

  /**
   *  Get cities list
   * 
   * @returns {Object}
   * @public
   */
  getCities: (req, res) => {
    lookupsService
      .fetchCities()
      .then(async (data) => {
        res.send({
          success: true,
          data
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: err
        });;
      });
  },

  /**
   *  Get occasions list
   * 
   * @returns {Object}
   * @public
   */
  getOccasions: (req, res) => {
    lookupsService
      .fetchOccasions()
      .then(async (data) => {
        res.send({
          success: true,
          data
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: err
        });;
      });
  },

  /**
   *  Get marital statuses list
   * 
   * @returns {Object}
   * @public
   */
  getMaritalStatuses: (req, res) => {
    lookupsService
      .fetchMaritalStatuses()
      .then(async (data) => {
        res.send({
          success: true,
          data
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: err
        });;
      });
  },

}
