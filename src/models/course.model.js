import mongoose from 'mongoose';

const courseSchema=new mongoose.Schema(
    {
        courseCode:{
            type:String,
            unique:true,
            required:[true,"Course Code is required"],
            trim:true,
            minlength: [5, "Course Code must be 5 characters"],
            maxlength: [10, "Course Code must be 5 characters"],
        },
        courseName:{
            type: String,
            required: [true, "Course name is required"],
            trim: true,
            minlength: [2, "Course Name must be at least 2 characters"],
            maxlength: [100, "Course Name cannot exceed 100 characters"],

        },
        instructor:{
            type:String,
            required: [true, "Instructor Name is required"],
            trim: true,
            minlength: [2, "Instructor Name must be at least 2 characters"],
            maxlength: [100, "Instructor Name cannot exceed 100 characters"],

        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
            default: "",
        },
        credits:{
            type:Number,
            required: [true, "Credits is required"],
            min: [0, "Semester must be at least 0"],
            max: [4, "Semester cannot exceed 4"],
        },
        

    },
    {
        timestamps: true
    }

);

export default mongoose.model("Course",courseSchema);