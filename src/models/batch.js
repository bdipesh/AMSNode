import mongoose from '../bin/connections'

const schemaBatch = {
    batchCode: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    batchName: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
};
const collectionName = "batch";
const batchSchema = mongoose.Schema(schemaBatch);
const Batch = mongoose.model(collectionName, batchSchema);


exports.getAllBatch = (perPage, page, filters) => {
    return new Promise((resolve, reject) => {
        Batch.find()
            .limit(parseInt(perPage))
            .skip(parseInt(page))
            .exec(function (err, batch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(batch);
                }
            })
    })

}


exports.createBatch = (batchData) => {
    return new Promise((resolve, reject)=> {
        Batch.create(batchData, (error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        })

    })

}

exports.updateBatchDetail = (batchId, batchData) => {
    return new Promise((resolve, reject)=> {
        Batch.findByIdAndUpdate(batchId, batchData,(error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        });
    })
}

exports.deleteBatch = (batchId) => {
    return new Promise((resolve, reject)=> {
        Batch.findByIdAndRemove(batchId, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response)
            }
        })
    })
}

