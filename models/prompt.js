import { model, models, Schema } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        // type is going to be a document in the database, more specifically the userId
        type: Schema.Types.ObjectId,
        // one-to-many relationship
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required"]
    },
    tag: {
        type: String,
        required: [true, "Tag is required"]
    }
})

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;