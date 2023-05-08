import { connectDB } from "@/db/lib/connectDb";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubAuthProvider from "next-auth/providers/github";
import { User, List, Product } from "@/db/models";

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
            products: [], // Add this line
          });
          await newUser.save();
        }
        return profile;
      },
    }),
  ],
};

export default NextAuth(authOptions);
