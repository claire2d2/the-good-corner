import AdRepository from "../repositories/Ad.repository";
import CategoryService from "./category.service";
import AdEntity from "../entities/Ad.entity";

export default class AdService {
	db: AdRepository;

	constructor() {
		this.db = new AdRepository();
	}

    // typeORM does the Promise for us

	async listAds() {
        return await this.db.find({relations: ["category"]});
	}

	async findAdById(id: string) {
		const foundAd = await this.db.findOne({where: {id}})
		if (!foundAd) {
			throw new Error("The ad does not exist")
		}
		return foundAd
	}

	async create(ad: Omit<AdEntity, "id">) {
        const newAd = await this.db.save({
            ...ad, 
        })
        return newAd;
	}

	async delete(id: string) {
		const deletedAd = await this.db.delete({id})
		if (deletedAd.affected === 0) {
			throw new Error("This ad does not exist")
		}
		return deletedAd
	}

	async update(id: string, ad: AdEntity) {
        const AdToUpdate = await this.findAdById(id)
        if (!AdToUpdate) {
            throw new Error("This ad does not exist")
        }
        const updatedAd = this.db.merge(AdToUpdate, ad)
        return updatedAd
	}
}
