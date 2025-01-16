import { Ad } from "../types/ads";

const adsList: Ad[] = [
	{
		id: "1",
		title: "titre 1",
		description: "description 1",
		price: 15.0,
		picture: "",
		location: "Toulouse",
	},
	{
		id: "2",
		title: "titre 2",
		description: "description 2",
		price: 30.0,
		picture: "",
		location: "Toulouse",
	},
];

export default class AdService {

    listAds() {
        return adsList;
    }

    findAdById(id: string){
        const adExists = adsList.find((ad) => ad.id === id);
        console.log(adExists)
        if (!adExists) {
            throw new Error ("The ad doesn't exist")
        }
        return adsList.find(((ad) => ad.id === id))
    }

    create(ad: Ad) {
        const adExists = adsList.some((a) => a.id === ad.id);
        if (adExists) {
            throw new Error("The ad already exists")
        }
        adsList.push(ad)
        return ad;
    }
}