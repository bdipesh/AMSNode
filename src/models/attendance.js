import mongoose from '../bin/connections'

const schemaAttendance = {
    student:
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: Attendance
        },
    batch: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Batch'
    },
    course: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course'
    },
    date: {
        type: Date,
        default: Date.now(),
        primaryKey: mongoose.SchemaTypes.primaryKey
    }


};
const collectionName = "attendance";
const attendanceSchema = mongoose.Schema(schema);
const Attendance = mongoose.model(collectionName, attendanceSchema);


exports.getAllAttendance = (perPage, page, filters) => {
    return new Promise((resolve, reject) => {
        Attendance.find()
            .limit(parseInt(perPage))
            .skip(parseInt(page))
            .exec(function (err, attendances) {
                if (err) {
                    reject(err);
                } else {
                    resolve(attendances);
                }
            })
    })

}

exports.getAttendanceByEmail = (email) => {
    return new Promise((resolve, reject)=> {
        Attendance.findOne({email: email})
            .select('email password name role batch course')
            .then((response)=> {
                resolve(response)
            }).catch((error)=> {
            reject(error)
        })
    })


}

exports.createAttendance = (attendanceData) => {
    return new Promise((resolve, reject)=> {
        Attendance.create(attendanceData, (error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        })

    })

}

exports.findAttendanceDetail = (attendanceId) => {
    return new Promise((resolve, reject)=> {
        Attendance.findById( attendanceId, (error, response)=>  {
            if(error) {
                reject(error);
            } else {
                resolve(response);
            }
        })
    })
}

exports.updateAttendanceDetail = (attendanceId, attendanceData) => {
    return new Promise((resolve, reject)=> {
        Attendance.findByIdAndUpdate(attendanceId, attendanceData,(error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        });
    })
}

exports.deleteAttendance = (attendanceId) => {
    return new Promise((resolve, reject)=> {
        Attendance.findByIdAndRemove(attendanceId, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response)
            }
        })
    })
}

