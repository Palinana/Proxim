import { Schema, model, models } from 'mongoose';
import { type } from 'os';

const UserSchema = new Schema(
    {
        first_name: { 
            type: String,
            required: [true, 'First name is required']
        },
        last_name: { 
            type: String,
            required: [true, 'Last name is required']
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        phone: {
            type: String,
            default: null,
            trim: true,
            // optional validation (recommended)
            match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number"],
        },
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "user",
        },
        // Only used when role === "user"
        saved_staffings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Staffing',
            },
        ],
        profile_completed: {
            type: Boolean,
            default: false
        } 
    },
    { timestamps: true }
);

const User = models.User || model('User', UserSchema);

export default User;
