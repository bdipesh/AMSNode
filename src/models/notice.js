import mongoose from '../controller/connections'

const schemaNotice = {
    noticeId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    title: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    description: {
        type: String,
        default: ''  
    },
    created_by: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    file: [{type: String}],
    feedBack: [{
            users: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'User'
            },
            feedback: {
                type: String,
            }}
    ],
    like: [{
            users: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'User'
            }}]
};
const collectionName = "notice";
const noticeSchema = mongoose.Schema(schemaNotice);
const Notice = mongoose.model(collectionName, noticeSchema);


exports.getAllNotice = (perPage, page, filters) => {
    return new Promise((resolve, reject) => {
        Notice.find()
            .limit(parseInt(perPage))
            .skip(parseInt(page))
            .exec(function (err, notice) {
                if (err) {
                    reject(err);
                } else {
                    resolve(notice);
                }
            })
    })

}


exports.createNotice = (noticeData) => {
    return new Promise((resolve, reject)=> {
        Notice.create(noticeData, (error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        })

    })

}

exports.updateNoticeDetail = (noticeId, noticeData) => {
    return new Promise((resolve, reject)=> {
        Notice.findByIdAndUpdate(noticeId, noticeData,(error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        });
    })
}

exports.deleteNotice = (noticeId) => {
    return new Promise((resolve, reject)=> {
        Notice.findByIdAndRemove(noticeId, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response)
            }
        })
    })
}

