const mongoose = require('mongoose')
const {Schema, model} = mongoose

const noteSchema = new Schema ({
	note: {type: String, required: true},
	date: {type: String, required: false},
})

const Note = model('Note', noteSchema)

module.exports = Note