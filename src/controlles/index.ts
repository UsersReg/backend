import { BaseService } from "@/services";
import { IRequest, IResponse } from "../types/http";

export abstract class BaseController<T> {
  constructor(protected service: BaseService<T>) {}
  abstract get(req: IRequest, res: IResponse): Promise<void>;
  abstract post(req: IRequest, res: IResponse): Promise<void>;
  abstract put(req: IRequest, res: IResponse): Promise<void>;
  abstract delete(req: IRequest, res: IResponse): Promise<void>;
}
