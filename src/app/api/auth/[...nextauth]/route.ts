import NextAuth from "next-auth"
import { NextAuthOptions } from 'next-auth';
import Google from "next-auth/providers/google"

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_SECRET),
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
}

const handler =  NextAuth(authOptions)

export { handler as GET, handler as POST }
