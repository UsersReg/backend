import { IUser } from "@/entities/user.entity";
import mongoose from "mongoose";
import { UserSchema } from "../schemas/user";

export const UserModel = mongoose.model<IUser>("User", UserSchema);
