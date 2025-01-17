import { Admin, User } from "@prisma/client";

declare module "next-auth" {
  type Session = {
    user: User & Admin;
  };
}

declare module "next-auth/jwt" {
  type JWT = {
    user: User & Admin;
  };
}
