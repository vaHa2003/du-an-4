import NextAuth from 'next-auth';

declare namespace NodeJS {
  interface ProcessEnv {
    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;
  }
}

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    accessToken?: {} | null; 
  }

  interface Session {
    user: User;
    provider: string; 
  }

  interface JWT {
    accessToken?: {} | null;
  }
}
