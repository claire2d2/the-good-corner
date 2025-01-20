import CategoryEntity from "../entities/Category.entity";
import CategoryService from "../services/category.service";
import { Response, Router } from "express";
import {
  CategoryCreateType,
  CategoryFindWithParams,
  CategoryUpdateType,
} from "../types/category";
import {
  ApiResponse,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../types/common";

const router = Router();

router.get("/list", async (_, res: Response<ApiResponse<CategoryEntity[]>>) => {
  try {
    const categoriesList = await new CategoryService().listCategories();
    res.send({ result: categoriesList, success: true });
  } catch (err: any) {
    res.status(500).send({ message: err.message ?? err, success: false });
  }
});

router.get(
  "/find/:id/:limit?",
  async (
    req: RequestWithParams<CategoryFindWithParams>,
    res: Response<ApiResponse<CategoryEntity>>
  ) => {
    const { id, limit } = req.params;
    try {
      const category = await new CategoryService().findCategoryById({
        id,
        limit,
      });
      res.send({ result: category, success: true });
    } catch (err: any) {
      res.status(500).send({ message: err.message ?? err, success: false });
    }
  }
);

//express validator
router.post(
  "/create",
  async (
    req: RequestWithBody<CategoryCreateType>,
    res: Response<ApiResponse<CategoryEntity>>
  ) => {
    const { title } = req.body;

    const category = {
      title,
    };

    try {
      const newCategory = await new CategoryService().create(category);
      res.status(201).send({ result: newCategory, success: true });
    } catch (err: any) {
      res.status(500).send({ message: err.message ?? err, success: false });
    }
  }
);

router.patch(
  "/update/:id",
  async (
    req: RequestWithParamsAndBody<{ id: string }, CategoryUpdateType>,
    res: Response<ApiResponse<CategoryEntity>>
  ) => {
    const { id } = req.params;
    const { title }: CategoryUpdateType = req.body;

    const category = { title };
    try {
      const categoryUpdate = await new CategoryService().update(id, category);
      res.send({ result: categoryUpdate, success: true });
    } catch (err: any) {
      res.status(500).send({ message: err.message ?? err, success: false });
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
      const categoryDelete = await new CategoryService().delete(id);

      res.send({
        result: `La catégorie ${categoryDelete} a bien était supprimée`,
        success: true,
      });
    } catch (error: any) {
      res.send({
        message: `La catégorie n'a pas pu etre supprimée : ${error}`,
        success: false,
      });
    }
  }
);
export default router;