import { connectDB } from "@/db/lib/connectDb";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GithubAuthProvider, { GithubProfile } from "next-auth/providers/github";
import { User, List, Product } from "@/db/models";
import { JWT } from "next-auth/jwt";

interface CustomJWT extends JWT {
  username?: string;
}
interface CustomSession extends Session {
  user: {
    name?: string;
    email?: string;
    image?: string;
    username?: string;
  }
}

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [
    GithubAuthProvider({
      clientId: process.env.GITHUB_SECRET_ID as string,
      clientSecret: process.env.GITHUB_SECRET_CLIENT as string,

      async profile(profile) {
        await connectDB();
        const oldUser = await User.findOne({ email: profile.email });


        if (!oldUser) {
          const newUser = new User({
            email: profile.email,
            username: profile.login,
            provider: "github",
            avatar: profile.avatar_url,
            products: [],
          });
          await newUser.save();
        }


        return { ...profile, username: profile.login };
      },
    }),
  ],
  callbacks: {
    async session({session, token}) {
      const customSession = session as CustomSession;
      const customToken = token as CustomJWT;

      customSession.user.username = customToken.username;

      return customSession;
    },

    async jwt({ token,  profile }) {
      const customToken = token as CustomJWT;
      const githubProfile = profile as GithubProfile;
      if (profile) {
        customToken.username = githubProfile.login
      }

      return customToken;
    },
  }
};

export default NextAuth(authOptions);
