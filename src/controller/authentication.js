import UserModel from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class HandleLogin {
    loginWithDetails(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        UserModel.getUserByEmail(email)
            .then((result) => {
                if (result) {
                    bcrypt.compare(password, result.password).then(() => {
                        const token = jwt.sign({details: result}, 'thisistestkey')
                        res.status(200).send({
                            success: true,
                            token: token
                        })
                    }).catch(() => {
                        res.status(400).send({message: "Password does not match."})
                    })
                } else {
                    res.status(400).send({message: "Invalid Login details."})
                }
            })
    }
}

export default HandleLogin;