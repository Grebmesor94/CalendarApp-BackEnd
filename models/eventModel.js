import mongoose, { model, Schema } from "mongoose";

const eventSchema = mongoose.Schema({
  title: { 
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  start: { 
    type: Date,
    required: true
  },
  end: { 
    type: Date,
    required: true
  },
  user: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

})

eventSchema.methods.toJSON = function() { 
  const { __v, _id, ...event } = this.toObject()
  event.id = _id;
  return event;
}

export default model( 'Event', eventSchema )