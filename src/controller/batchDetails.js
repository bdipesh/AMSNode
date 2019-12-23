import BatchModel from "../models/batch";
import bcrypt from 'bcryptjs'


class BatchDetails {
    batchList (req, res) {
        let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
        let page = 0;
        let filters = ""
        if (req.query) {
            if(req.query.name){
                filters = req.query.name
            }
            if (req.query.page) {
                req.query.page = parseInt(req.query.page);
                page = Number.isInteger(req.query.page) ? req.query.page : 0;
            }
        }
        BatchModel.getAllBatch(limit, page, filters)
            .then((result) => {
                res.status(200).send(result);
            })
    }
    createBatch (req, res) {
        const batchData = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            dob: req.body.dob,
            phone: req.body.phone,
            batch: req.body.batch,
            course: req.body.course,
            role: req.body.role
        }
        BatchModel.createBatch(batchData)
            .then((result) => {
                res.status(201).send({id: result._id});
            });
    }
    updateBatch (req, res) {
        let batchData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            dob: req.body.dob,
            phone: req.body.phone,
            batch: req.body.batch,
            course: req.body.course,
            role: req.body.role
        }
        BatchModel.updateBatchDetail(req.params.id, batchData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }

    findOneBatch (req, res) {
        BatchModel.findBatchDetail(req.params.id)
            .then((result)=> {
                res.status(201).send(result)
            })
    }

    deleteBatch (req, res) {
        BatchModel.deleteBatch(req.params.id)
            .then((result)=> {
                res.status(200).send(result)
            })
    }


}

export default BatchDetails;