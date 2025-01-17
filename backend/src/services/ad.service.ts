import { Ad, AdWithoutId } from "../types/ads";

let adsList: Ad[] = [
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

    delete(id: string) {
        const ad = this.findAdById(id);
        adsList = adsList.filter((a) => a.id !== ad?.id)
        return ad?.id
    }

    update(id: string, ad: AdWithoutId<Ad>) {
        let adToUpdate = this.findAdById(id)
        // if identical keys, the keys will be replaced by the last one
        // adToUpdate = {...adToUpdate, ...ad}
        Object.keys(ad).forEach((k) => {
            if(ad[k] && adToUpdate) {
                adToUpdate[k] = ad[k]
            }
        })
        return adToUpdate
    }
}