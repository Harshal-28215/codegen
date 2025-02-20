import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    message: [{
        role: String,
        message: String,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}
);

export default mongoose.models.Workspace || mongoose.model("Workspace", workspaceSchema);