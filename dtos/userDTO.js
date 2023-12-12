module.exports = class UserDTO {
  id;
  username;
  role;
  status;

  constructor(model) {
    this.id = model._id;
    this.username = model.username;
    this.role = model.role;
    this.status = model.status;
  }
};
