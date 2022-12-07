const { Schema, model } = require("mongoose");

const notesSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
            trim: true
        },
        content: {
            type: String
        },
    },
    {
        timestamps: true
    }
);

const Notes = model("Notes", notesSchema);

module.exports = Notes;