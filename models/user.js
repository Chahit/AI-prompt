import { Schema,model,models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required:[true, 'Email is required!']
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 
        "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
});


const User = models.User || model("User", UserSchema);
export default User;
/*
we would do this if we were working regular always on always working server 

the models object is provided by the mongoose library and stores all the
registered models 

if a model named user already exist in the models object it assigns that exisiting
model to the "user" variable

this prevents redefining the model and ensures that the existing 
model is reused

if a model named user does not exist in the models object the model
function from mongoose is called to create a new model

the newly created model is then assigned to the "user" variable 

*/