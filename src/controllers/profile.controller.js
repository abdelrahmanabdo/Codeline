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
  getUserProfile: async (req, res) => {
    await profileService.fetchUserProfile(req.params.id)
      .then((result) => {
        const profile = {};
        profile.user = result[0][0];
        profile.information = result[1][0] || null;
        profile.gallery = result[2];
        profile.occasions = result[3];
        profile.projects = result[4];

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
  getProfileInformation:async (req, res) => {
    await profileService
      .fetchProfileInformation(req.params.id)
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
  getProfileGalleries: async (req, res) => {
    await profileService
      .fetchProfileGalleries(req.params.id)
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
  getProfileOccasions: async (req, res) => {
    await profileService
      .fetchProfileOccasions(req.params.id)
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
  getProfileProjects: async (req, res) => {
    await profileService
      .fetchProfileProjects(req.params.id)
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
  getSingleGallery: async (req, res) => {
    const {id, galleryId} = req.params;
    await profileService
      .fetchSingleGallery(id, galleryId)
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
  getSingleOccasion: async (req, res) => {
    const {id, occasionId} = req.params;
    await profileService
      .fetchSingleOccasion(id, occasionId)
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
  getSingleProject: async (req, res) => {
    const {id, projectId} = req.params;
    await profileService
      .fetchSingleProject(id, projectId)
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
    if (Object.keys(req.body).length === 0) 
      return res.status(400).send({success: false, message: 'No Data Sent'});

    const data = req.body;

    // Check if user already has a profile 
    const hasProfile = await profileService.checkUserHasProfile(req.params.id);

    if (data.name || data.email || data.avatar) {
      let user = {};
      if (data.name) user['name'] = data.name;
      if (data.email) user['email'] = data.email;
      if (data.avatar) user['avatar'] = data.avatar;

      // Update user data
      await userService.updateUser(req.params.id, user);

      delete data.name;
      delete data.email;
      delete data.avatar;
    }

    // Upsert data
    await profileService
      .upsertProfileInformation(
      hasProfile ? 'update' : 'insert',
      req.params.id, 
      data
    )
    .then(() => {
      return res.status(200).send({
        success: true,
        message: `profile information is ${hasProfile 
          ? 'updated' 
          : 'inserted'} successfully!`
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

    // const isUser = await userService.fetchUserById(req.params.id);
    // if (isUser) {
      // Update data
      await profileService
        .insertNewGalleryRow(req.params.id, req.body)
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
    // } else {
    //    return res.status(400).send({
    //      success: false,
    //      message: 'No User Found With This Id!'
    //    });
    // }

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

    // Fetch user data if exists
    // const user = await userService.fetchUserById(req.params.id);
    // if (user) {
      // Update data
      await profileService
        .insertNewOccasionRow(req.params.id, req.body)
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
    // } else {
    //   return res.status(404).send({
    //     success: false,
    //     message: 'No User Found With This Id!'
    //   });
    // }
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
    // Fetch user if exists.
    // const user = await userService.fetchUserById(req.params.id);
    // if (user) {
      // Update data
      await profileService
        .insertNewProjectRow(req.params.id, req.body)
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
    // } else {
    //   return res.status(404).send({
    //     success: false,
    //     message: 'No User Found With This Id!'
    //   });
    // }
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
    profileService
      .deleteGallery(id, galleryId)
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
    await profileService
      .deleteProject(id, projectId)
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
    await profileService
      .deleteOccasion(id, occasionId)
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