const db = require('../utils/db');

module.exports = {

  /**
   * Fetch languages.
   * 
   * @returns {Array}
   * @public
   */
  fetchLanguages: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'select * from languages where active = 1',
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  },

  /**
   * Fetch cities.
   * 
   * @returns {Array}
   * @public
   */
  fetchCities: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'select * from cities where active = 1',
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  },

  /**
   * Fetch occasions.
   * 
   * @returns {Array}
   * @public
   */
  fetchOccasions: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'select * from occasions where active = 1',
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  },

  /**
   * Fetch marital statuses.
   * 
   * @returns {Array}
   * @public
   */
  fetchMaritalStatuses: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'select * from marital_statuses where active = 1',
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  },
}
