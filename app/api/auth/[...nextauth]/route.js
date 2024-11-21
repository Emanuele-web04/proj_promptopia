import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@/models/user';
import { connectToDB } from '@/utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });
        console.log("Checked")
        if (!userExists) {
            const generatedUsername = profile.name
              ? profile.name.replace(/\s+/g, "").toLowerCase()
              : `user_${Date.now()}`; // Genera un username predefinito se profile.name è undefined
      
            await User.create({
              email: profile.email,
              username: generatedUsername, // Passa il valore generato
              image: profile.picture || "/default-image.png", // Usa un'immagine di default se non presente
            });
          }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }