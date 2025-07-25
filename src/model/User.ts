import mongoose,{Schema, Document} from 'mongoose';


export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now , required: true}
});


export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptedMessage: boolean;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    isverified?: boolean;

}

const UserSchema: Schema<User> = new Schema({
    username: { type: String, required: [true,"username is required"], unique: true,trim: true },
    email: { type: String, required: [true,"email is required"], unique: true,trim: true ,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password: { type: String, required: [true,"password is required"],trim: true },          
    verifyCode: { type: String, required: [true,"verifyCode is required"],trim: true },
    verifyCodeExpiry: { type: Date, required: [true,"verifyCodeExpiry is required"] },
    isAcceptedMessage: { type: Boolean, default: true },
    messages: { type: [MessageSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
     isverified: { type: Boolean, default: false } 
     
    });



//const UserModel = mongoose.model<User>('User', UserSchema);
//export default UserModel;

const UserModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model('User', UserSchema);
export default UserModel;