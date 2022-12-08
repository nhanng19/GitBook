const { Schema } = require('mongoose');

const userSchema = require('./User');

const projectSchema = new Schema(
    {   
        projectName: {
            type: String,
            require: true,
        },
        projectDescription: {
            type: String,
            require: true,
        },
        task: [{
            type: String,
        }],
        colaborators: [userSchema],       
    }
);

module.exports = projectSchema;