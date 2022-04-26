const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


let BlogSchema = new mongoose.schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    authorId: { type: ObjectId, ref: 'Author' },
    tags: mix,
    category: { type: String, required: true },
    subcategory: { type: mix },
    timestamps: true,
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
    isPublished: { type: Boolean, default: false }

})
module.exports = mongoose.model('Blog', BlogSchema)