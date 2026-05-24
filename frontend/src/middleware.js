import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/artist-portal",
  },
});

export const config = { matcher: ["/admin"] };