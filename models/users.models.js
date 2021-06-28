const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const userSchema = new Schema({
  login: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  interes: [{ type: Object }],
});

module.exports = model('User', userSchema);
