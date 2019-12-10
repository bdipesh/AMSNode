import express from 'express';
const router = express.Router();
import userDetails from '../controller/userDetails'
const { check, validationResult } = require('express-validator');
const details = new userDetails()
router.get('/users', function(req, res, next) {
  console.log(JSON.stringify(details.getAllUsers()) + ' hitting')
  details.getAllUsers(res);
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const validateAllFields = () => {
    check('name', "Name field must be required").not().isEmpty(),
        check('email').isEmail().not().isEmpty(),
        check('password', "Name field must be required").not().isEmpty(),
        check('batch', "Name field must be required").not().isEmpty(),
        check('course', "Name field must be required").not().isEmpty()
};
router.post('/users', [ validateAllFields(),
 function(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    details.createUsers(req, res);
  }

}]);
export default router;
