import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

// Creation of the new User schema
const messageSchema = new mongoose.Schema({
  username: { type: String, unique: true, trim: true},
  name: String,
  email: { type: String, lowercase: true, trim: true },
  password: String
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
