import UserModel from "../models/user";
import bcrypt from 'bcryptjs'


class UserDetails {
      userList (req, res) {
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
          UserModel.getAllUsers(limit, page, filters)
              .then((result) => {
                  res.status(200).send(result);
              })
    }
     createUsers (req, res) {
          const userData = {
              name: req.body.name,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password),
              dob: req.body.dob,
              phone: req.body.phone,
              batch: req.body.batch,
              course: req.body.course,
              role: req.body.role
          }
         UserModel.createUser(userData)
             .then((result) => {
                 res.status(201).send({id: result._id});
             });
    }
    updateUsers (req, res) {
          let userData = {
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              dob: req.body.dob,
              phone: req.body.phone,
              batch: req.body.batch,
              course: req.body.course,
              role: req.body.role
          }
         UserModel.updateUserDetail(req.params.id, userData)
             .then((result) => {
                 res.status(201).send({id: result});
             });
    }

    findOneUser (req, res) {
          UserModel.findUserDetail(req.params.id)
              .then((result)=> {
                  res.status(201).send(result)
              })
    }

    deleteUser (req, res) {
          UserModel.deleteUser(req.params.id)
              .then((result)=> {
                  res.status(200).send(result)
              })
    }


}

export default UserDetails;