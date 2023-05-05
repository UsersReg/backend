import { UsersRepository } from "@/repositories/mongodb/users.repository";
import { UsersService } from "@/services/users.service";
import { IRequest, IResponse } from "@/types/http";
import { Router } from "express";
import { UsersController } from "src/controlles/users.controller";

export default function buildUsers() {
  const router = Router();
  const controller = new UsersController(
    new UsersService(new UsersRepository())
  );
  router.get("/", (req, res) => controller.get(req, res));
  router.post("/", (req, res) => controller.post(req, res));
  router.put("/:id", (req, res) => controller.put(req, res));
  router.delete("/:id", (req, res) => controller.delete(req, res));

  return router;
}
