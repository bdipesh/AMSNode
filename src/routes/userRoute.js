import express from 'express';
const router = express.Router();
import userDetails from '../controller/userDetails'

router.get('/users', function(req, res, next) {
    const details = new userDetails()
    res.json(details.getAllUsers());
});
export default userRouters;