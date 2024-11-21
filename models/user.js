import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true, // L'unicità viene gestita automaticamente dal database
        required: [true, 'Email is required!'], // Messaggio per il campo obbligatorio
    },    
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
})

//check first if exists a user, if not add it
// this happens because the function is called everytime and the connection is established everytime
const User = models.User || model("User", userSchema)

export default User