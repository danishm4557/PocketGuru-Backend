const express = require("express");
const note = express.Router();
const Note = require("../models/Notes");
// const compression = require("compression");

// note.use(compression()); // Data coming from Front-End too large. Using this to compress it.

note.get("/", (req, res) => {
  Note.find({}, (error, foundNote) => {
    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(200).json(foundNote);
    }
  });
});

note.post("/", (req, res) => {
  console.log(req.body);
  Note.create(req.body, (error, createdNote) => {
    if (error) {
      res.status(400).json(error);
    } else {
      console.log(createdNote);
      res.status(200).json(createdNote);
    }
  });
});

//UPDATE Route to edit/change a reservation
note.put('/:id', (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body, {new:true},
  (error, updatedNote) => {
    if(error) {
      res.status(400).json({ error: message })
    } else {
      res.status(200).json({
        message: `Reservation ${updatedNote.id} updated successfully`,
        data: updatedNote
      })
      console.log(updatedNote)
    }
  })
})

module.exports = note;