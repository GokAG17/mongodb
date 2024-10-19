const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch'
  },
  subjects: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
      },
      marks: {
        type: Number,
        default: 0
      }
    }
  ],
  gpa: {
    type: Number,
    min: 0,
    max: 4.0,
    default: 0
  }
});

studentSchema.methods.calculateGPA = function () {
  let totalMarks = 0;
  let totalCredits = 0;

  // Calculate total marks and credits
  this.subjects.forEach((subjectInfo) => {
    totalMarks += subjectInfo.marks;
    // Assuming each subject has a fixed credit value of 3
    totalCredits += 3;
  });

  // Calculate GPA (assuming credits are all the same for each subject)
  if (totalCredits > 0) {
    this.gpa = totalMarks / totalCredits;
  } else {
    this.gpa = 0; // Default GPA if no subjects or credits
  }
};

studentSchema.pre('save', function (next) {
  // Automatically calculate GPA before saving
  this.calculateGPA();
  next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
