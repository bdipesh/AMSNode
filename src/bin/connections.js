import mongoose from 'mongoose'
import options from '../config'


try {
    mongoose.connect(options.url, options.optionsForDatabase);
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
