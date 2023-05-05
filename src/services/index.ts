import { BaseRepository } from "../repositories";

export abstract class BaseService<T> {
  constructor(protected repository: BaseRepository<T>) {}
  abstract create(dto: ICreateDTO): Promise<T>;
  abstract read(dto: IReadDTO): Promise<T[]>;
  abstract update(dto: IUpdateDTO): Promise<T>;
  abstract delete(dto: IDeleteDTO): Promise<void>;
}
