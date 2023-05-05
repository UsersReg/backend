export abstract class BaseRepository<T> {
  constructor() {}
  abstract create(dto: ICreateDTO): Promise<T>;
  abstract read(dto: IReadDTO): Promise<T[]>;
  abstract update(dto: IUpdateDTO): Promise<T>;
  abstract delete(dto: IDeleteDTO): Promise<void>;
}
