import { connectDB } from "@/db/lib/connectDb";
import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import GithubAuthProvider, { GithubProfile } from "next-auth/providers/github";
import { Social, User } from "@/db/models";

interface User extends NextAuthUser {
  username?: string;
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

          const socials = await new Social({
            userId: newUser._id
          }).save()
          newUser.socials = socials
          await newUser.save()
        }

        return { ...profile, username: profile.login };
      },
    }),
  ],
  callbacks: {
    async jwt({ token,  profile }) {
      const githubProfile = profile as GithubProfile;
      if (profile) {
        token.username = githubProfile.login
      }
      return token;
    },
    async session({ session, token }) {
      const user = { ...session.user, username: token.username } as User;
      return { ...session, user };
    }
  }
};

export default NextAuth(authOptions);
