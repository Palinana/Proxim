import GoogleProvider from 'next-auth/providers/google';

import User from '../models/User';
import connectDB from '../config/database';

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks: {
        // Invoked on successful signin
        async signIn({ profile }) {
            // 1. Connect to database
            await connectDB();
            // 2. Check if user exists
            const userExists = await User.findOne({ email: profile.email });
            // 3. If not, then add user to database
            if (!userExists) {
                await User.create({
                    first_name: profile.given_name,
                    last_name: profile.family_name,
                    email: profile.email,
                    phone: profile.phone
                });
        }
            // 4. Return true to allow sign in
            return true;
        },
        // Modifies the session object
        async session({ session }) {
            // 1. Get user from database
            const user = await User.findOne({ email: session.user.email });
            // 2. Assign the user id to the session
            session.user.id = user._id.toString();
            session.user.role = user.role;
            session.user.phone = user.phone;
            // 3. return session
            return session;
        },
    }
}
