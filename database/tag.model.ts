import  {model,models, Schema , Document } from "mongoose";


export interface ITag extends Document{
   name:string;
   description:string;
   questions:Schema.Types.ObjectId[];
   followers:Schema.Types.ObjectId[];
   createdOn:Date;
}


const tagSchema = new Schema<ITag>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question', // Reference to the Question model or another applicable model
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model or another applicable model
    }],
    createdOn: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

export const Tag = models.Tag||model<ITag>('Tag', tagSchema);


 
 