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
   * Get profile Galleries.
   * 
   * @returns {Object}
   * @public
   */
  getProfileGalleries: (req, res) => {
    profileService.fetchProfileGalleries(req.params.id)
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
    * Get profile single Gallery.
    * 
    * @returns {Object}
    * @public
    */
  getSingleGallery: (req, res) => {
    const {id, galleryId} = req.params;
    profileService.fetchSingleGallery(id, galleryId)
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
    * Get profile single Occasion.
    * 
    * @returns {Object}
    * @public
    */
  getSingleOccasion: (req, res) => {
    const {id, occasionId} = req.params;
    profileService.fetchSingleOccasion(id, occasionId)
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
    * Get profile single project.
    * 
    * @returns {Object}
    * @public
    */
  getSingleProject: (req, res) => {
    const {id, projectId} = req.params;
    profileService.fetchSingleProject(id, projectId)
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
      // Update data
      profileService.insertNewGalleryRow(req.params.id, req.body)
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
      // Update data
      profileService.insertNewOccasionRow(req.params.id, req.body)
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
      await profileService.insertNewProjectRow(req.params.id, data)
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
    const {id, galleryId} = req.params;
    // Delete row
    profileService.deleteGallery(id, galleryId)
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
   * Delete profile gallery.
   * 
   * @returns {Object}
   * @public
   */
  deleteProfileProject: async (req, res) => {
    const {id, projectId} = req.params;
    // Delete row
    profileService.deleteProject(id, projectId)
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
    const {id, occasionId} = req.params;
    // Delete row
    profileService.deleteOccasion(id, occasionId)
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