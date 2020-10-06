const roleModel = require("../models").tbl_role;

module.exports = {
  addRole(req, res) {
    const newRole = {
      name: req.body.name,
    };
    return roleModel
      .create(newRole)
      .then((role) =>
        res.status(201).send({
          success: true,
          message: "New role is created...!! ",
          role,
        })
      )
      .catch((error) => res.status(400).send(error));
  },

  listRole(req, res) {
    return roleModel
      .findAll({
        order: [["id", "ASC"]],
      })
      .then((role) => {
        res.status(200).send(role);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getRoleById(req, res) {
    return roleModel
      .findByPk(req.params.id, {})
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: "Role not found...!!",
          });
        }
        return res.status(200).send(role);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
};
