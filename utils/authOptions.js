import GoogleProvider from "next-auth/providers/google";
import User from "../models/User";
import connectDB from "../config/database";

export const authOptions = {
    session: { strategy: "jwt" },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async signIn({ profile }) {
            await connectDB();

            const userExists = await User.findOne({ email: profile.email });

            if (!userExists) {
                    await User.create({
                    first_name: profile.given_name,
                    last_name: profile.family_name,
                    email: profile.email,
                    phone: profile.phone,
                    role: "user", // default role
                });
            }

            return true;
        },

        // IMPORTANT: fetch user from DB here
        async jwt({ token }) {
            await connectDB();

            const user = await User.findOne({ email: token.email });

            if (user) {
                token.id = user._id.toString();
                token.role = user.role;
                token.phone = user.phone;
            }

            return token;
        },

        async session({ session, token }) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phone = token.phone;
        return session;
        },
    },
};
