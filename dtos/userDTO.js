module.exports = class UserDTO {
  _id;
  username;
  fullName;
  areas;
  role;
  status;

  constructor(model) {
    this._id = model._id;
    this.username = model.username;
    this.fullName = model.fullName;
    this.areas = model.areas;
    this.role = model.role;
    this.status = model.status;
  }
};
