import { Repository } from "typeorm";
import AdRepository from "./Ad.repository";
import CategoryEntity from "../entities/Category.entity";
import datasource from "../lib/datasource";

export default class CategoryRepository extends Repository<CategoryEntity> {
	constructor() {
		super(CategoryEntity, datasource.createEntityManager());
	}

	// add limits
	async findCategoryByIdWithAds(id: string) {
		const adsRepository = new AdRepository();
		const category = await this.findOne({ where: { id } });
		if (!category) {
			throw new Error("No category found");
		}
		const ads = await adsRepository
			.createQueryBuilder("ad")
			.where("ad.category =:id", { id })
			.orderBy("ad.created_at")
			.getMany();
		return { ...category, ads };
	}
}
