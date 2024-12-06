import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google, Facebook],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.provider = account.provider;  // Lưu provider vào token
            }
            return token;
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            return session;
        },
    },
});
