import { Router } from "express";
import AdService from "../services/ad.service";
import { Ad } from "../types/ads";

const router = Router();

router.get("/list", (req, res) => {
    const adsList = new AdService().listAds()
	res.send(adsList);
});

router.get("/find/:id", (req, res) => {
    const { id } = req.params
    try {
        const foundAd = new AdService().findAdById(id)
        res.status(200).send(foundAd)
    } catch (error: any) {
        res.status(404).send({message: error.message})
    }
});

// missing express validator
router.post("/create", (req, res) => {
    console.log("Received body:", req.body); 
    const {id, title, description, picture, location, price}: Ad = req.body
    const ad = {
        id,
        title,
        description,
        picture,
        location, 
        price
    };
    console.log(ad)
    try {
        const newAd = new AdService().create(ad)
        res.status(201).send({success:true, ad:newAd})
    } catch (error: any) {
        res.status(500).send({message: error.message})
    }
})


export default router;