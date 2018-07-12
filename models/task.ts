import * as mongoose from "mongoose";

export interface ITask extends mongoose.Document {
    name: {
        type: string,
        require: true
    };
    description: {
        type: string,
        require: false
    };
    scheduled_date: Date;
}

export const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false
    },
    scheduled_date: {
        type: Date,
        default: new Date()
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

export const model = mongoose.model<ITask>("Task", schema);

export const cleanCollection = (): Promise<any> => model.remove({}).exec();

export default model;