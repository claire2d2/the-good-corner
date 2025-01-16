import { Router } from "express";
import AdService from "../services/ad.service";

const router = Router();

router.get("/list", (req, res) => {
    const adsList = new AdService().listAds()
	res.send(adsList);
});

router.get("/find/:id", (req, res) => {
    const { id } = req.params
    const foundAd = new AdService().findAdById(id)
    res.send(foundAd)

});


export default router;