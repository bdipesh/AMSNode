import express from 'express';
const router = express.Router();
import batchDetails from '../controller/batchDetails'
import { check, validationResult } from 'express-validator'
import checkAuth from '../middleware/checkAuth'
import BatchModel from '../models/batch'
const details = new batchDetails()



router.get('/batches', [details.batchList]);
router.get('/batches/:id', [details.findOneBatch]);
router.delete('/batches/:id', [details.deleteBatch]);

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

const validateBatch = () => {
    return [
        check('name').notEmpty().withMessage("Name field is required.")
            .not().isNumeric().withMessage("Name field should not contain Number."),
        check('email').not().isEmpty().withMessage("Should not be empty")
            .isEmail().withMessage("Enter valid email")
            .custom(email => {
                console.log(email)
                BatchModel.getBatchByEmail(email).then((response)=> {
                    if(!response) {
                        console.log('error')
                        throw new Error("Email already used.")
                    }
                }).catch(()=> {
                    console.log('hello')
                })
            })
        ,
        check('password').not().isEmpty().withMessage("Password field is required.")
            .isLength({min:8}).withMessage("Password field must contain 8 charters."),
        check('batch', "Name field must be required").not().isEmpty(),
        check('course', "Name field must be required").not().isEmpty(),
    ]
}

router.put('/batches/:id', validateBatch(),  (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    } else {
        details.updateBatchs(req, res)
    }
});
router.post('/batches',
    checkAuth.checkToken,
    validateBatch(), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            details.createBatches(req, res);
        }

    });

router.post('/get-token', (req, res)=> {
    details.handleLogin(req, res)
})

export default router;
