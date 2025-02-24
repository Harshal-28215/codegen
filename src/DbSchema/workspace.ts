import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    message: [{
        role: String,
        message: String,
    }],
    files:Object,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: { type: Date, default: Date.now }
}
);

export default mongoose.models.Workspace || mongoose.model("Workspace", workspaceSchema);