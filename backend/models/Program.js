const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  _id: {
    $oid: String
  },
  status: Number,
  created_by: {
    $oid: String
  },
  created_at: {
    $date: Date
  },
  program_name: String,
  program_short_description: String,
  program_description: String,
  organization_ids: [String],
  super_admin: {
    $oid: String
  },
  program_start_date: {
    $date: Date
  },
  program_end_date: {
    $date: Date
  },
  modules_list: [{
    module_name: String,
    module_description: String,
    module_start_date: {
      $date: Date
    },
    module_end_date: {
      $date: Date
    },
    order: Number,
    activity_list: [{
      type: String,
      activity_start_date: {
        $date: Date
      },
      activity_end_date: {
        $date: Date
      },
      status: Number,
      data: {
        no_of_attempt: String,
        test_id: String,
        test_name: String
      },
      order: Number
    }]
  }]
});

module.exports = mongoose.model('Program', programSchema);
