import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  passcodeHash: { type: String, default: '' }
},{ timestamps: true })
export default mongoose.models.User || mongoose.model('User', UserSchema)
