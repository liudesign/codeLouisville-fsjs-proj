'use strict';

import mongoose from 'mongoose';

var RaceSchema = new mongoose.Schema({
  horsename: String,
  jockey: String,
  trainer: String,
  active: Boolean
});

export default mongoose.model('Race', RaceSchema);
