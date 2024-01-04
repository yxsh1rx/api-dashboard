module.exports = class UserDTO {
  id;
  username;
  fullName;
  locations;
  role;
  status;

  constructor(model) {
    this.id = model._id;
    this.username = model.username;
    this.fullName = model.fullName;
    this.locations = model.locations;
    this.role = model.role;
    this.status = model.status;
  }
};
