const { Schema, model } = require("mongoose");

const toDoSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
            trim: true
        },
        content: {
            type: String
        },
        category: {
            type: String
        },
        user:{
            type: Schema.Types.ObjectId, ref: "User"
        }
    },  
    {
        timestamps: true
    }
);

const ToDo = model("ToDo", toDoSchema);

module.exports = ToDo;