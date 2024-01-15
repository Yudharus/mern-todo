import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const prioritySchema = new Schema({
    id_priority: Number,
    status: String
}, { timestamps: true });
const Priority = mongoose.model('Priority', prioritySchema)
export default Priority;