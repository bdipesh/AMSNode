import User from "../models/user";

class UserDetails {
     async getAllUsers (res) {
        let details = []
        await User.find({}).then( (users) => {
            details = users || "No Item is saved";
            console.log(details)
            res.status(200).json(details) ;
        }).catch((error)=> {
            console.log(error);
        })
    }
    async createUsers (req) {
         await User.create({
             name: req.body.name,
             email: req.body.email,
             password: req.body.password,
             dob: req.body.dob,
             phone: req.body.phone,
             batch: req.body.batch,
             course: req.body.course,
             role: req.body.role
         }).then((error, response)=> {
             if(error) {
                 console.log(error)
                 return error
             } else {
                 return response
             }
         })
    }


}

export default UserDetails;