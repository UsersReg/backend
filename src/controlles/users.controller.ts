import { BaseController } from ".";
import { IUser } from "@/entities/user.entity";
import { IRequest, IResponse } from "@/types/http";
import { BaseService } from "@/services";
import { ZodError } from "zod";

export class UsersController extends BaseController<IUser> {
  constructor(protected service: BaseService<IUser>) {
    super(service);
  }
  async get(req: IRequest, res: IResponse): Promise<void> {
    try {
      const { id, name, email } = req.query as {
        id?: string;
        name?: string;
        email?: string;
      };
      const result = await this.service.read({
        id,
        name,
        email,
      } as IUsersReadDTO);
      res.status(200).send(result);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message, err.stack);
      } else if (typeof err === "string") {
        console.error(err);
      }
      res.status(500).send({ message: `Failed to retrieve data from server.` });
    }
  }
  async post(req: IRequest, res: IResponse): Promise<void> {
    try {
      const { data } = req.body as { data: any };
      const result = await this.service.create({ data });
      res.status(200).send(result);
    } catch (err) {
      if (err instanceof ZodError) {
        const messages = err.issues.map((x) => x.message).join(", ");
        console.error(err.message, err.stack);
        res.status(500).send({
          message: `Failed to create. (${messages})`,
        });
      } else if (err instanceof Error) {
        console.error(err.message, err.stack);
        res.status(500).send({ message: `Failed to create. (${err.message})` });
      } else if (typeof err === "string") {
        console.error(err);
        res.status(500).send({ message: `Failed to create. (${err})` });
      }
    }
  }
  async put(req: IRequest, res: IResponse): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const { data } = req.body as { data: IUsersUpdateDTO };
      const result = await this.service.update({ id, data });
      res.status(200).send(result);
    } catch (err) {
      if (err instanceof ZodError) {
        const messages = err.issues.map((x) => x.message).join(", ");
        console.error(err.message, err.stack);
        res.status(500).send({
          message: `Failed to update. (${messages})`,
        });
      } else if (err instanceof Error) {
        console.error(err.message, err.stack);
        res.status(500).send({ message: `Failed to update. (${err.message})` });
      } else if (typeof err === "string") {
        console.error(err);
        res.status(500).send({ message: `Failed to update. (${err})` });
      }
    }
  }
  async delete(req: IRequest, res: IResponse): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      await this.service.delete({ id });
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message, err.stack);
      } else if (typeof err === "string") {
        console.error(err);
      }
      res.status(500).send({ message: `Failed to delete!` });
    }
  }
}
