import mongoose from '../bin/connections'

const schemaCourse = {
    courseCode: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    courseName: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
};
const collectionName = "course";
const courseSchema = mongoose.Schema(schemaCourse);
const Course = mongoose.model(collectionName, courseSchema);


exports.getAllCourse = (perPage, page, filters) => {
    return new Promise((resolve, reject) => {
        Course.find()
            .limit(parseInt(perPage))
            .skip(parseInt(page))
            .exec(function (err, course) {
                if (err) {
                    reject(err);
                } else {
                    resolve(course);
                }
            })
    })

}


exports.createCourse = (courseData) => {
    return new Promise((resolve, reject)=> {
        Course.create(courseData, (error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        })

    })

}

exports.updateCourseDetail = (courseId, courseData) => {
    return new Promise((resolve, reject)=> {
        Course.findByIdAndUpdate(courseId, courseData,(error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        });
    })
}

exports.deleteCourse = (courseId) => {
    return new Promise((resolve, reject)=> {
        Course.findByIdAndRemove(courseId, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response)
            }
        })
    })
}

