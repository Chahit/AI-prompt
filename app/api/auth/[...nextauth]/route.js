// it's a api route within auth then nextauth and then route 

import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import  User  from '@models/user';
import { connectToDB } from "@utils/database";
import { model } from "mongoose";

// we are creating a handler function to handle the authentiction
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{

    
    async session({session}){
        const sessionUser = await User.findOne({
          email: session.user.email
        })

        session.user.id = sessionUser._id.toString();

        return session;
    },
    async signIn({profile}) {
      try {
        await connectToDB();

        // if exist

        const userExists = await User.findOne({
          email: profile.email
        });

        // does not exist (creating a new user)
        if(!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").
            toLowerCase(),
            image: profile.picture
          })
        }


        // we have to check two things here if a user already exist 
        // if not then we have to create a new user
// every next js route is known as serverless route which means that 
// it is a lambda function it opens up when it is called
// so everytime when it is called it need to spin up the server and 
// make a connection to the database so we don't needto make our server 
// running constantly but we do have to make a connection with DB
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
})

export {handler as GET, handler as POST };