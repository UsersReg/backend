import { BaseService } from ".";
import { IUser } from "@/entities/user.entity";
import { BaseRepository } from "@/repositories";
import { z } from "zod";
import bcrypt from "bcrypt";

export class UsersService extends BaseService<IUser> {
  constructor(protected repository: BaseRepository<IUser>) {
    super(repository);
  }
  async create(dto: ICreateDTO): Promise<IUser> {
    const { data } = dto;

    const createUserSchema = z.object({
      name: z
        .string({ required_error: "Name is required" })
        .min(2, "User name must be at least 2 characters"),
      email: z
        .string({ required_error: "Email is required" })
        .min(7, "Email is must be at least 7 characters!")
        .email("Email not valid")
        .refine(async (e) => {
          const usersEmails = (await this.read({})).map((user) => user.email);
          return !usersEmails.includes(e);
        }, "This email is registered to another user!"),
      password: z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be at least 8 characters"),
    });

    await createUserSchema.parseAsync(data);

    const { name, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { password: _password, ...result } = await this.repository.create({
      data: { name, email, password: hashedPassword },
    });

    return result;
  }
  async read(dto: IUsersReadDTO): Promise<IUser[]> {
    const result = await this.repository.read(dto);
    return result.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }
  async update(dto: IUsersUpdateDTO): Promise<IUser> {
    const { id, data } = dto;
    const user = (await this.repository.read({ id }))?.[0];

    if (!user) throw new Error("User not found");

    const updateUserSchema = z.object({
      name: z
        .string({ required_error: "Name is required" })
        .min(2, "User name must be at least 2 characters"),
      email: z
        .string({ required_error: "Email is required" })
        .min(7, "Email is required!")
        .email("Email not valid")
        .refine(async (e) => {
          const usersEmails = (await this.read({}))
            .filter((user) => user.id !== id)
            .map((user) => user.email);
          return !usersEmails.includes(e);
        }, "This email is registered to another user!"),
      password: z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be at least 8 characters"),
      oldPassword: z
        .string({ required_error: "Old password is required" })
        .refine(
          async (e) => await bcrypt.compare(e, user.password ?? ""),
          "Old password does not match"
        ),
    });

    await updateUserSchema.parseAsync(data);

    const { name, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { password: _password, ...result } = await this.repository.update({
      id,
      data: { name, email, password: hashedPassword },
    });

    return result;
  }
  async delete(dto: IDeleteDTO): Promise<void> {
    await this.repository.delete(dto);
  }
}
