import mongoose from '../bin/connections'

const schema = {
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Others']
    },
    batch: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Batch',
        required: false,
    }],
    dob: {
        type: mongoose.SchemaTypes.Date,
        required: true
    },
    course: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course' ,
        required: true
    }],
    role: {
        type: mongoose.SchemaTypes.String,
        required: true,
        enum: ['teacher', 'student']
    },
    phone: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    picture: {
        type: String,
        required: false,
        default: ''
    }
};
const collectionName = "user";
const userSchema = mongoose.Schema(schema);
const User = mongoose.model(collectionName, userSchema);


exports.getAllUsers = (perPage, page, filters) => {
    return new Promise((resolve, reject) => {
        User.find()
            // .select('password ')
            .limit(parseInt(perPage))
            .skip(parseInt(page))
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    })

}

exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject)=> {
        User.findOne({email: email})
            .select('email name role batch course')
            .then((response)=> {
            resolve(response)
        }).catch((error)=> {
            reject(error)
        })
    })


}

exports.createUser = (userData) => {
    return new Promise((resolve, reject)=> {
       User.create(userData, (error, response) => {
           if(error){
               reject(error);
           }
           else {
               resolve(response)
           }
       })

    })

}

exports.findUserDetail = (userId) => {
    return new Promise((resolve, reject)=> {
        User.findById( userId, (error, response)=>  {
            if(error) {
                reject(error);
            } else {
                resolve(response);
            }
        })
    })
}

exports.updateUserDetail = (userId, userData) => {
    return new Promise((resolve, reject)=> {
        User.findByIdAndUpdate(userId, userData,(error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        });
    })
}

exports.deleteUser = (userId) => {
    return new Promise((resolve, reject)=> {
       User.findByIdAndRemove(userId, (error, response) => {
           if(error) {
               reject(error);
           } else {
               resolve(response)
           }
       })
    })
}

