import TagEntity from "../entities/Tag.entity";
import TagService from "../services/tag.service";
import { Response, Router } from "express";
import { TagCreateType, TagUpdateType } from "../types/tags";
import {
  ApiResponse,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../types/common";

const router = Router();

router.get("/list", async (_, res: Response<ApiResponse<TagEntity[]>>) => {
  try {
    const tagsList = await new TagService().listTags();
    res.send({ result: tagsList, success: true });
  } catch (err: any) {
    res.status(500).send({ message: err.message ?? err, success: false });
  }
});
router.get(
  "/find/:id",
  async (
    req: RequestWithParams<{ id: string }>,
    res: Response<ApiResponse<TagEntity>>
  ) => {
    const { id } = req.params;
    try {
      const tag = await new TagService().findTagById(id);
      res.send({ result: tag, success: true });
    } catch (err: any) {
      res.status(500).send({ message: err.message ?? err, success: false });
    }
  }
);

router.post(
  "/create",
  async (
    req: RequestWithBody<TagCreateType>,
    res: Response<ApiResponse<TagEntity>>
  ) => {
    const { label }: TagCreateType = req.body;

    const tag = {
      label,
    };

    try {
      const newTag = await new TagService().create(tag);
      res.status(201).send({ result: newTag, success: true });
    } catch (err: any) {
      res.status(500).send({ message: err.message ?? err, success: false });
    }
  }
);

router.patch(
  "/update/:id",
  async (
    req: RequestWithParamsAndBody<{ id: string }, TagUpdateType>,
    res: Response<ApiResponse<TagEntity>>
  ) => {
    const { id } = req.params;
    const { label }: TagUpdateType = req.body;

    const tag = { label };
    try {
      const tagUpdate = await new TagService().update(id, tag);
      res.send({ result: tagUpdate, success: true });
    } catch (err: any) {
      res.status(500).send({ message: err.message ?? err, success: false }); // opérateur de coalescence ?? ||
    }
  }
);

router.delete(
  "/delete/:id",
  async (
    req: RequestWithParams<{ id: string }>,
    res: Response<ApiResponse<string>>
  ) => {
    try {
      const { id } = req.params;
      const tagDelete = await new TagService().delete(id);

      res.send({
        result: `Le tag ${tagDelete} a bien était supprimé`,
        success: true,
      });
    } catch (error: any) {
      res.send({
        message: `Le tag n'a pas pu etre supprimé : ${error}`,
        success: false,
      });
    }
  }
);
export default router;