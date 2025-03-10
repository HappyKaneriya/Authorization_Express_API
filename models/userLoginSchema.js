const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username must not exceed 20 characters'],
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: function(v) {
        return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(v);
      },
      message: props => `${props.value} is not a valid password! It must contain at least one letter, one number, and one special character.`
    }
  },
});

// Hash password before saving (optional)
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('UserLoginDetails', userSchema);

module.exports = User;
