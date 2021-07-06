const profileService = require('../services/profile.service');
const { validationResult } = require('express-validator');
const userService = require('../services/user.service');

module.exports = {
  /**
   * Get all users.
   * 
   * @returns {Object}
   * @public
   */
  getUserProfile: (req, res) => {
    profileService.fetchUserProfile(req.params.id)
      .then((result) => {
        const profile = {};
        profile.information = result[0][0];
        profile.gallery = result[1];
        profile.projects = result[2];
        profile.occasions = result[3];

        res.send({
          success: true,
          data: profile
        })
      })
      .catch((err) => {
        return res.status(500).send({
          success: false,
          message: err
        });
      });
  },

  /**
   * Get profile information.
   * 
   * @returns {Object}
   * @public
   */
  getProfileInformation: (req, res) => {
    profileService.fetchProfileInformation(req.params.id)
      .then((result) => {
        res.send({
          success: true,
          data: result
        })
      })
      .catch((err) => {
        return res.status(500).send({
          success: false,
          message: err.sqlMessage
        });
      });
  },


 /**
   * Get profile Gallery.
   * 
   * @returns {Object}
   * @public
   */
  getProfileGallery: (req, res) => {
    profileService.fetchProfileGallery(req.params.id)
      .then((result) => {
        res.send({
          success: true,
          data: result
        })
      })
      .catch((err) => {
        return res.status(500).send({
          success: false,
          message: err.sqlMessage
        });
      });
  },


 /**
   * Get profile Occasions.
   * 
   * @returns {Object}
   * @public
   */
  getProfileOccasions: (req, res) => {
    profileService.fetchProfileOccasions(req.params.id)
      .then((result) => {
        res.send({
          success: true,
          data: result
        })
      })
      .catch((err) => {
         return res.status(500).send({
           success: false,
           message: err.sqlMessage
         });
      });
  },

 /**
   * Get profile projects.
   * 
   * @returns {Object}
   * @public
   */
  getProfileProjects: (req, res) => {
    profileService.fetchProfileProjects(req.params.id)
      .then((result) => {
        res.send({
          success: true,
          data: result
        })
      })
      .catch((err) => {
         return res.status(500).send({
           success: false,
           message: err.sqlMessage
         });
      });
  },

  /**
   * Upsert user's profile information.
   * 
   * @param {Object?} data 
   * @returns {Object}
   * @public
   */
  upsertProfileInformation: async (req, res, next) => {
    if (Object.keys(req.body).length === 0 ) 
      return res.status(400).send({success: false, message: 'No Data Sent'});

    const data = JSON.parse(JSON.stringify(req.body));

    // If there is avatar in the data
    if (data.hasOwnProperty('avatar')) {

    }
    // Check if user already has a profile 
    const hasProfile = await profileService.checkUserHasProfile(req.params.id);

    // Upsert data
    profileService.upsertProfileInformation(
      hasProfile ? 'update' : 'insert',
      req.params.id, 
      data
    )
    .then(() => {
      return res.status(200).send({
        success: true,
        message: `profile information is ${hasProfile ? 'updated' : 'inserted'} successfully!`
      });
    })
    .catch((err) => {
      return res.status(500).send({
        success: false,
        message: err.sqlMessage
      });
    });
  },

  /**
   * Insert profile gallery.
   * 
   * @returns {Object}
   * @public
   */
  insertProfileGallery: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    const isUser = await userService.fetchSpecificUser(req.params.id);

    if (isUser) {
      const data = JSON.parse(JSON.stringify(req.body));
      // Update data
      profileService.insertNewGalleryRow(req.params.id, data)
        .then(() => {
          return res.status(200).send({
            success: true,
            message: `Data is inserted successfully!`
          });
        })
        .catch((err) => {
          return res.status(500).send({
            success: false,
            message: err.sqlMessage
          });
        });
    } else {
       return res.status(400).send({
         success: false,
         message: 'No User Found With This Id!'
       });
    }

  },

  /**
   * Insert profile Occasion.
   * 
   * @returns {Object}
   * @public
   */
  insertProfileOccasion: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    const isUser = await userService.fetchSpecificUser(req.params.id);

    if (isUser) {
      const data = JSON.parse(JSON.stringify(req.body));
      // Update data
      profileService.insertNewOccasionRow(req.params.id, data)
        .then(() => {
          return res.status(200).send({
            success: true,
            message: `Data is inserted successfully!`
          });
        })
        .catch((err) => {
          return res.status(500).send({
            success: false,
            message: err.sqlMessage
          });
        });
    } else {
      return res.status(404).send({
        success: false,
        message: 'No User Found With This Id!'
      });
    }
  },

  /**
   * Insert profile Project.
   * 
   * @returns {Object}
   * @public
   */
  insertProfileProject: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const isUser = await userService.fetchSpecificUser(req.params.id);

    if (isUser) {
      const data = JSON.parse(JSON.stringify(req.body));
      // Update data
      profileService.insertNewProjectRow(req.params.id, data)
        .then(() => {
          return res.status(200).send({
            success: true,
            message: `Data is inserted successfully!`
          });
        })
        .catch((err) => {
          return res.status(500).send({
            success: false,
            message: err.sqlMessage
          });
        });
    } else {
      return res.status(404).send({
        success: false,
        message: 'No User Found With This Id!'
      });
    }
  },


  /**
   * Delete profile gallery.
   * 
   * @returns {Object}
   * @public
   */
  deleteProfileGallery: async (req, res) => {
    const {id, itemId} = req.params;
    // Delete row
    profileService.deleteGallery(id, itemId)
      .then((isDeleted) => {
        return res.status(200).send({
          success: isDeleted,
          message: isDeleted
            ? `Data Is Deleted Successfully!` 
            : `Please Check IDs!`
        });
      })
      .catch((err) => {
        return res.status(500).send({
          success: false,
          message: err.sqlMessage
        });
      });
  },

  /**
   * Delete profile Occasion.
   * 
   * @returns {Object}
   * @public
   */
  deleteProfileOccasion: async (req, res) => {
    const {id, itemId} = req.params;
    // Delete row
    profileService.deleteOccasion(id, itemId)
      .then((isDeleted) => {
        return res.status(200).send({
          success: isDeleted,
          message: isDeleted
            ? `Data Is Deleted Successfully!` 
            : `Please Check IDs!`
        });
      })
      .catch((err) => {
        return res.status(500).send({
          success: false,
          message: err.sqlMessage
        });
      });
  },

}