import AdEntity from "../entities/Ad.entity";
import multer from "multer";
import { AdCreateType, AdUpdateType, FilterType } from "../types/ads";
import { Response, Router } from "express";
import { ApiResponse, RequestWithBodyAndFile, RequestWithParams, RequestWithParamsBodyAndFile, RequestWithQuery } from "../types/common";
import AdService from "../services/ad.service";

const router = Router();

const storage = multer.diskStorage({
  destination(_, __, cb) {
    // dossier de stockage des fichiers
    cb(null, "uploads/");
  },
  filename(_, file, cb) {
    //renommage des fichiers pour éviter les conflits
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get(
  "/list",
  async (
    req: RequestWithQuery<FilterType>,
    res: Response<ApiResponse<AdEntity[]>>
  ) => {
    let { limit, order } = req.query;
    try {
      const adsList = await new AdService().listAds({
        limit,
        order,
      });
      res.send({ result: adsList, success: true });
    } catch (err: any) {
      res.status(500).send({ message: err.message ?? err, success: false });
    }
  }
);

router.get(
  "/find/:id",
  async (
    req: RequestWithParams<{ id: string }>,
    res: Response<ApiResponse<AdEntity>>
  ) => {
    const { id } = req.params;

    try {
      const ad = await new AdService().findAdById(id);
      res.send({ result: ad, success: true });
    } catch (err: any) {
      res.status(500).send({ message: err.message ?? err, success: false });
    }
  }
);

router.post(
  "/create",
  upload.single("picture"),
  async (
    req: RequestWithBodyAndFile<AdCreateType>,
    res: Response<ApiResponse<AdEntity>>
  ) => {
    const {
      title,
      description,
      location,
      price,
      categoryId,
      tagsIds,
    }: AdCreateType = req.body;

    const ad = {
      title,
      description,
      picture: req.file?.filename ?? "",
      location,
      price,
      categoryId,
      tagsIds: tagsIds ?? [],
    };
    try {
      const newAd = await new AdService().create(ad);
      res.status(201).send({ result: newAd, success: true });
    } catch (err: any) {
      res.status(500).send({ message: err.message ?? err, success: false });
    }
  }
);

router.patch(
  "/update/:id",
  upload.single("picture"),

  async (
    req: RequestWithParamsBodyAndFile<{ id: string }, AdUpdateType>,
    res: Response<ApiResponse<AdEntity>>
  ) => {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      price,
      tagsIds,
      categoryId,
    }: AdUpdateType = req.body;

    const ad = {
      title,
      description,
      picture: req.file?.filename ?? "",
      location,
      price,
      tagsIds,
      categoryId,
    };
    try {
      const adUpdate = await new AdService().update(id, ad);
      res.send({ result: adUpdate, success: true });
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
      const adDelete = await new AdService().delete(id);

      res.send({
        result: `L'annonce ${adDelete} a bien était supprimée`,
        success: true,
      });
    } catch (error: any) {
      res.status(500).send({
        message: `L'annonce n'a pas pu etre supprimée : ${error}`,
        success: false,
      });
    }
  }
);
export default router;