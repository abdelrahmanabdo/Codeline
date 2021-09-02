const contactsService = require('../services/contacts.service');
const { validationResult } = require('express-validator');

module.exports = {

  /**
   * Add new contacts to user contacts
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  addUserContacts: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    let {contacts} = req.body;
    if (contacts && contacts.length > 0) {
      await contactsService
        .addNewContacts(req.params.id, contacts)
        .then(async (status) => {
          let addedContacts = [];
          if (status)
            addedContacts = await contactsService.fetchUserContacts(req.params.id);

          return res.status(200).send({
            success: true,
            message: 'Contacts are added successfully',
            data: addedContacts
          })
        })
        .catch((error) => {
          return res.status(500).send({
            success: false,
            message: error
          });
        });
    } else {
      return res.status(200).send({
        success: false,
        message: 'Empty contacts list'
      })
    }
  },

  /**
   * Get user's contacts list
   * @param {Object} req 
   * @param {Object} res 
   */
  getUserContacts: async (req, res) => {
    await contactsService
      .fetchUserContacts(req.params.id)
      .then(data => {
        return res.status(200).send({
          success: true,
          data
        })
      })
      .catch((error) => {
        return res.status(500).send({
          success: false,
          message: error
        });
      });
  },

  /**
   * Search in user Contacts
   * @param {Object} req 
   * @param {Object} res 
   */
  searchInUserContacts: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }
    
    await contactsService
      .searchInContacts(req.params.id, req.body.query)
      .then(data => {
        return res.status(200).send({
          success: true,
          data
        })
      })
      .catch((error) => {
        return res.status(500).send({
          success: false,
          message: error
        });
      });
  },
}