import express from 'express';
const router = express.Router();
import userDetails from '../controller/userDetails'
const { check, validationResult } = require('express-validator');
import checkAuth from '../middleware/checkAuth'
import UserModel from '../models/user'
const details = new userDetails()



router.get('/', [details.userList]);
router.get('/:id', [details.findOneUser]);
router.delete('/:id', [details.deleteUser]);

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

const validateUser = () => {
    return [
        check('name').notEmpty().withMessage("Name field is required.")
            .not().isNumeric().withMessage("Name field should not contain Number."),
        check('email').not().isEmpty().withMessage("Should not be empty")
            .isEmail().withMessage("Enter valid email")
            .custom(email => {
                console.log(email)
                UserModel.getUserByEmail(email).then((response)=> {
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

router.put('/users/:id', validateUser(),  (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    } else {
        details.updateUsers(req, res)
    }
});
router.post('/users',
    checkAuth.verifyToken,
    validateUser(), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            details.createUsers(req, res);
        }

    });

router.post('/get-token', (req, res)=> {
    details.handleLogin(req, res)
})

export default router;
