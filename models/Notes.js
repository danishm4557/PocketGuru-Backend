const mongoose = require('mongoose')
// const {Schema, model} = mongoose

const noteSchema = new mongoose.Schema ({
	note: {type: String, required: true},
	date: {type: String, required: false},
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note;