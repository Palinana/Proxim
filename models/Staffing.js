import { Schema, model, models } from 'mongoose';

const StaffingSchema = new Schema(
    {
        caseId: {
            type: String,
            required: true,
            unique: true
        },
        serviceType: {
            type: String,
            enum: ["OT", "PT", "ST", "ABA", "SI"],
            required: true,
            index: true,
        },
        status: {
            type: String,
            enum: ["Open", "Pending", "Filled", "Closed"],
            default: "open",
            index: true,
        },
        workload: {
            visits: {
                type: Number, // e.g. 2
                required: true,
                min: 1,
            },
            duration: {
                type: Number,
                enum: [30, 60],
                required: true,
            },
            frequency: {
                type: String,
                enum: ["Weekly", "Monthly"],
                required: true,
            },
        },
        preferredSchedule: {
            type: [String],
            enum: ["Morning", "Afternoon", "Evening"],
            default: [], // “No preference”
        },
        // Approximate location only (HIPAA-safe)
        location: {
            // geohash: {
            //     type: String,
            //     required: true,
            //     index: true,
            // },
      
            // Optional coarse metadata (safe)
            city: String,
            state: String,
            zipcode: String,
      
            // Approximate map point (rounded / truncated)
            // coordinates: {
            //     lat: {
            //         type: Number,
            //         required: true,
            //     },
            //     lng: {
            //         type: Number,
            //         required: true,
            //     },
            // },
        },
        // Who created / owns this staffing
        coordinator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            index: true,
        },
    },

    { timestamps: true }
);

const Staffing = models.Staffing || model('Staffing', StaffingSchema);

export default Staffing;
