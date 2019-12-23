import express from 'express';
const router = express.Router();
import userDetails from '../controller/userDetails'
const { check, validationResult } = require('express-validator');
import checkAuth from '../middleware/checkAuth'
import BatchModel from '../models/user'
const details = new userDetails()



router.get('/', [details.userList])
      .post('/',
        checkAuth.checkToken,
        validateBatch(), (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            } else {
                details.createBatchs(req, res);
            }

    });

router.get('/:id', [details.findOneBatch])
    .delete('/:id', [details.deleteBatch])
    .put('/:id', validateBatch(),  (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        } else {
            details.updateBatchs(req, res)
        }
});


router.post('/get-token', (req, res)=> {
    details.handleLogin(req, res)
})

export default router;
