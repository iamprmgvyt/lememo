import mongoose from 'mongoose'
const NoteSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: '' },
  content: { type: String, default: '' }
},{ timestamps: true })
export default mongoose.models.Note || mongoose.model('Note', NoteSchema)
