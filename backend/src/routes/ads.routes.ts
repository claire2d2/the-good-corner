import { Router } from "express";
import AdService from "../services/ad.service";
import { Ad, AdWithoutId } from "../types/ads";

const router = Router();

router.get("/list", async (req, res) => {
	try {
		const adsList = await new AdService().listAds();
		res.status(200).send(adsList);
	} catch (error: any) {
		res.status(404).send({ message: error.message });
	}
});

router.get("/find/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const foundAd = await new AdService().findAdById(id);
        // console.log(foundAd)
		res.status(200).send(foundAd);
	} catch (error: any) {
		res.status(404).send({ message: error });
	}
});

// missing express validator
router.post("/create", async (req, res) => {
	const { id, title, description, picture, location, price }: Ad = req.body;
	const ad = {
		id,
		title,
		description,
		picture,
		location,
		price,
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
		const deletedAd = await new AdService().delete(id);
		res.status(201).send({success: true, message : `Ad with id ${deletedAd} has been successfully deleted`});
	} catch (error: any) {
		res.status(404).send({ message: error });
	}
});

router.patch("/update/:id", async (req, res) => {
	const { id } = req.params;
	const { title, description, picture, location, price }: AdWithoutId<Ad> =
		req.body;
	const ad = {
		id,
		title,
		description,
		picture,
		location,
		price,
	};
	try {
		const updatedAd = await new AdService().update(id, ad);
		res.status(201).send("success");
	} catch (error: any) {
		res.status(404).send({ message: error.message });
	}
});

export default router;
