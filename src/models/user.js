import mongoose from '../controller/connections'

const schema = {
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
        select: false
    },
    batch: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    dob: {
        type: mongoose.SchemaTypes.Date,
        required: true
    },
    course: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    role: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    phone: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
};
const collectionName = "user"
const userSchema = mongoose.Schema(schema);
const User = mongoose.model(collectionName, userSchema);
export default  User;