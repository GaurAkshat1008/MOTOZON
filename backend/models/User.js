import mongoose from 'mongoose';

// User schema with role-based field
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;