import { Session as NextAuthSession } from "next-auth";




interface CustomSession extends NextAuthSession {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string;
  };
}

export default CustomSession
