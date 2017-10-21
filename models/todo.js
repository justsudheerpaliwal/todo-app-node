let mongoose = require("mongoose");

let todoSchema  =new mongoose.Schema({
    name: {
        type: String,
        required: 'Name can not be empty'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

let Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;