import { Router } from "express";
import AdService from "../services/ad.service";
import { Ad, AdWithoutId } from "../types/ads";
import AdEntity from "../entities/Ad.entity";

const router = Router();

router.get("/list", async (req, res) => {
	try {
		const adsList = await new AdService().listAds();
		res.status(200).send(adsList);
	} catch (error: any) {
		res.status(404).send({ message: error });
	}
});

router.get("/find/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const foundAd = await new AdService().findAdById(id);
        // console.log(foundAd)
		res.status(200).send(foundAd);
	} catch (error: any) {
		res.status(404).send({ message: error.message });
	}
});

// missing express validator
router.post("/create", async (req, res) => {
	const { title, description, picture, location, price, category, tags }: Omit<AdEntity, "id"| "created_at" | "updated_at"> = req.body;
	const ad = {
		title,
		description,
		picture,
		location,
		price,
        category,
		tags: tags ?? []
	};
	try {
		const newAd = await new AdService().create(ad);
        console.log(newAd)
		res.status(201).send({ success: true, ad: newAd });
	} catch (error: any) {
		res.status(500).send({ success: false,message: error });
	}
});

router.delete("/delete/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await new AdService().delete(id);
		res.status(201).send({success: true, message : `Ad with id ${id} has been successfully deleted`});
	} catch (error: any) {
		res.status(404).send({ message: error });
	}
});

router.patch("/update/:id", async (req, res) => {
	const { id } = req.params;
	const { title, description, picture, location, price, category, tags }: Omit<AdEntity, "id" | "created_at" | "updated_at"> =
		req.body;
	const ad = {
		id,
		title,
		description,
		picture,
		location,
		price,
		category, 
		tags
	};
	try {
		const updatedAd = await new AdService().update(id, ad);
		res.status(201).send("success");
	} catch (error: any) {
		res.status(404).send({ message: error.message });
	}
});

export default router;
