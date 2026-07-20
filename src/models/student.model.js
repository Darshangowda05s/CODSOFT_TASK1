import mongoose from 'mongoose';

const studentSchema=new mongoose.Schema(
    {
        studentID:{
            type:String,
            unique:true,
            required:[true,"Student ID is required"],
            trim:true,
            minlength: [2, "Student ID must be between 2 and 8 characters"],
            maxlength: [8, "Student ID must be between 2 and 8 characters"],
        },
        name:{
            type: String,
            required: [true, "Student name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [100, "Name cannot exceed 100 characters"],

        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true, 
            lowercase: true,
        },
        phone:{
            type:String,
            required: [true, "Phone number is required"],
            trim: true,
            match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
        },
        department:{
            type:String,
            required: [true, "Department is required"],
            trim: true,
        },
        semester:{
            type:Number,
            required: [true, "Semester is required"],
            min: [1, "Semester must be at least 1"],
            max: [8, "Semester cannot exceed 8"],
        },
        

    },
    {
        timestamps: true
    }

);

export default mongoose.model("Student",studentSchema);