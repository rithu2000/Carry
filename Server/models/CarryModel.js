import { Schema, model } from "mongoose";

const stepSchema = new Schema({
    steps: {
        type: Object,
        required: true,
    }
})
const Steps = model("Steps", stepSchema);

export default Steps;