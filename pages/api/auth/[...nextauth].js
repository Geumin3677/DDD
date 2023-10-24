// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({  
// 	providers: [
//   GoogleProvider({
//     clientId: process.env.GOOGLE_ID, 
//     clientSecret: process.env.GOOGLE_SECRET
// 	  }),
// 	],
// });

// export { handler as GET, handler as POST };

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: "936274339062-jjnh87ti8j85fjhcu2nvgj2685igi647.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // ...add more providers here
  ],
  callbacks: {
    session: async ({ session, token }) => {
        return session
    }
  }
};
export default NextAuth(authOptions);
