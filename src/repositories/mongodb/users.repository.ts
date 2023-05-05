import { IUser } from "@/entities/user.entity";
import { UserModel } from "@/infra/mongodb/models/user";
import { BaseRepository } from "..";

export class UsersRepository extends BaseRepository<IUser> {
  constructor() {
    super();
  }
  async create(dto: ICreateDTO): Promise<IUser> {
    const result = await UserModel.create(dto.data);

    return {
      id: result._id.toString(),
      name: result.name,
      email: result.email,
      password: result.password,
    };
  }
  async read(dto: IUsersReadDTO): Promise<IUser[]> {
    let data = [];
    const { id, name, email } = dto;
    if (id) {
      data = await UserModel.find({ _id: id }).exec();
    } else if (name) {
      data = await UserModel.find({ name: { $in: name } }).exec();
    } else if (email) {
      data = await UserModel.find({ email }).exec();
    } else {
      data = await UserModel.find().exec();
    }
    const result = data.map(
      (user) =>
        ({
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          password: user.password,
        } as IUser)
    );

    return result;
  }
  async update({ id, data }: IUpdateDTO): Promise<IUser> {
    const result = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    if (!result) throw new Error("Failed to update user");
    return {
      id: result._id.toString(),
      name: result.name,
      email: result.email,
      password: result.password,
    };
  }
  async delete(dto: IDeleteDTO): Promise<void> {
    await UserModel.findByIdAndDelete(dto.id).exec();
  }
}
