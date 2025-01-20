import { Router } from "express";
import TagEntity from "../entities/Tag.entity";
import TagService from "../services/tags.service";

const router = Router();

router.get("/list", async (req, res) => {
	try {
		const tagsList = await new TagService().listTags();
		res.status(200).send(tagsList);
	} catch (error: any) {
		res.status(404).send({ message: error.message });
	}
});

router.get("/find/:id", async (req, res) => {});

router.post("/create", async (req, res) => {
	const { label }: Omit<TagEntity, "id"> = req.body;
	const tag = { label };
	try {
		const createdTag = await new TagService().create(tag);
		res.status(200).send({
			success: true,
			message: `The tag "${createdTag}}"has been successfully created`,
		});
	} catch (error: any) {
		res.status(404).send({ message: error.message });
	}
});

router.patch("/update", async (req, res) => {});

router.delete("/delete", async (req, res) => {});

export default router;
