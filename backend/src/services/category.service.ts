import { Category, CategoryWithoutId } from "../types/category";
import CategoryRepository from "../repositories/Category.repository";
import CategoryEntity from "../entities/Category.entity";

export default class CategoryService {
	db: CategoryRepository;

	constructor() {
		this.db = new CategoryRepository();
	}

	async listCategories() {
        return await this.db.find();
	}

	async findCatById(id: string) {
		const foundCat = await this.db.findOne({where: {id}})
		if (!foundCat) {
			throw new Error("The ad does not exist")
		}
		return foundCat
	}

	async findCatByIdWithAds(id: string) {
		const foundCat = await this.db.findCategoryByIdWithAds(id)
		if (!foundCat) {
			throw new Error("The ad does not exist")
		}
		return foundCat
	}

	async create(cat: Omit<CategoryEntity, "id">) {
        const newCat = await this.db.save({
            ...cat, 
        })
        return newCat;
	}

	async update(id: string, cat: CategoryWithoutId) {
		const CatToUpdate = await this.findCatById(id)
        if (!CatToUpdate) {
            throw new Error("This ad does not exist")
        }
        const updatedAd = this.db.merge(CatToUpdate, cat)
        return updatedAd
	}
	

	async delete(id: string) {
		const deletedCat = await this.db.delete({id})
		if (deletedCat.affected === 0) {
			throw new Error("This ad does not exist")
		}
		return deletedCat
	}
}
