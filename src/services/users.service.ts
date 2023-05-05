import { BaseService } from ".";
import { IUser } from "@/entities/user.entity";
import { BaseRepository } from "@/repositories";
import { z } from "zod";

export class UsersService extends BaseService<IUser> {
  constructor(protected repository: BaseRepository<IUser>) {
    super(repository);
  }
  async create(dto: ICreateDTO): Promise<IUser> {
    const { data } = dto;

    const createUserSchema = z.object({
      name: z.string().min(2, "User name must be at least 2 characters"),
      email: z
        .string()
        .min(7, "Email is required!")
        .email("Email not valid")
        .refine(async (e) => {
          const usersEmails = (await this.read({})).map((user) => user.email);
          return !usersEmails.includes(e);
        }, "This email is registered to another user!"),
      password: z.string().min(8, "Password must be at least 8 characters"),
    });

    await createUserSchema.parseAsync(data);

    return await this.repository.create({ data });
  }
  async read(dto: IUsersReadDTO): Promise<IUser[]> {
    return await this.repository.read(dto);
  }
  async update(dto: IUpdateDTO): Promise<IUser> {
    const { id, data } = dto;

    const updateUserSchema = z.object({
      name: z.string().min(2, "User name must be at least 2 characters"),
      email: z
        .string()
        .min(7, "Email is required!")
        .email("Email not valid")
        .refine(async (e) => {
          const usersEmails = (await this.read({}))
            .filter((user) => user.id !== id)
            .map((user) => user.email);
          return !usersEmails.includes(e);
        }, "This email is registered to another user!"),
      password: z.string().min(8, "Password must be at least 8 characters"),
    });

    await updateUserSchema.parseAsync(data);

    return await this.repository.update({ id, data });
  }
  async delete(dto: IDeleteDTO): Promise<void> {
    await this.repository.delete(dto);
  }
}
