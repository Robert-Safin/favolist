import NextAuth, {NextAuthOptions} from "next-auth";
import  GithubAuthProvider  from "next-auth/providers/github";

const authOptions: NextAuthOptions = {
  providers: [
    GithubAuthProvider({
      clientId: process.env.GITHUB_SECRET_ID as string,
      clientSecret: process.env.GITHUB_SECRET_CLIENT as string
    })
  ]
}



export default NextAuth(authOptions)
