import { Router } from "express";
import CategoryService from "../services/category.service";
import CategoryEntity from "../entities/Category.entity";

const router = Router();

router.get("/list", async (req, res) => {
	try {
		const catsList = await new CategoryService().listCategories();
		res.status(200).send(catsList);
	} catch (error: any) {
		res.status(404).send({ message: error });
	}
});

router.post("/create", async (req, res) => {
	const { title }: Omit<CategoryEntity, "id"> = req.body;
	const cat = { title };
	try {
		const createdCat = await new CategoryService().create(cat);
		res
			.status(200)
			.send({
				success: true,
				message: `The category "${createdCat}}"has been successfully created`,
			});
	} catch (error: any) {
		res.status(404).send({ message: error });
	}
});

router.patch("/update/:id", async (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	const cat = { title };
	try {
		const updatedCat = await new CategoryService().update(id, cat);
        res.status(201).send({success: true, message: `Category with id ${id} has been successfully updated`})
	} catch (error: any) {
		res.status(500).send({ message: error });
	}
});

router.delete("/delete/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const deletedCat = await new CategoryService().delete(id);
        res.status(201).send({success: true, message: `Category with id ${id} has been successfully deleted`})
    } catch (error: any) {
		res.status(500).send({ message: error });
	}
})

export default router;
