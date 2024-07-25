const mongoose = require('mongoose');

const learnerSchema = new mongoose.Schema({
  learner_id: {
    $oid: String
  },
  learner_name: String,
  email_id: String,
  alt_email_id: String,
  gender: String,
  dob: {
    $date: Date
  },
  city: String,
  state: String,
  country: String,
  programs_assigned: [{
    program_id: {
      $oid: String
    }
  }]
});

module.exports = mongoose.model('Learner', learnerSchema);
