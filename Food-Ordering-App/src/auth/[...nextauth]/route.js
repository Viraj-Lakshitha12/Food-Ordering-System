import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: {label: "Email", type: "email", placeholder: "test@example.com"},
                password: {label: "Password", type: "password"},
            },

        })
    ],
});


