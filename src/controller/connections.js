import mongoose from 'mongoose'

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false
}

const uri = 'mongodb://localhost:27017/amsdev'

try {
         mongoose.connect(uri, options);
         const db = mongoose.connection;
        db.on("error", () => {
            console.log("> error occurred from the database");
        });
        db.once("open", () => {
            console.log("> successfully opened the database");
        });

} catch (error) {
    console.log(error);
}
export default mongoose;
