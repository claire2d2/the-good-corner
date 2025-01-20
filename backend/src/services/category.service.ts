import CategoryEntity from '../entities/Category.entity';
import CategoryRepository from '../repositories/Category.repository';
import {
  CategoryCreateType,
  CategoryFindWithParams,
  CategoryUpdateType,
} from "../types/category";

export default class CategoryService {
  db: CategoryRepository;

  constructor() {
    this.db = new CategoryRepository();
  }

  async listCategories() {
    return await this.db.find();
  }

  async findCategoryById({ id, limit }: CategoryFindWithParams) {
    let category: CategoryEntity | null;
    if (limit) {
      // si limit est indiquée, on va chercher la méthode personnalisé dans notre repository
      category = await this.db.findCategoryByIdWithLimitAds({ id, limit });
    } else {
      category = await this.db.findOne({ where: { id }, relations: ["ads"] });
    }
    // const category = await this.db.findOne({ where: { id } });
    if (!category) {
      throw new Error("No Category found");
    }
    return category;
  }

  async create(category: CategoryCreateType) {
    const newCategory = await this.db.save(category);
    return newCategory;
  }
  async update(id: string, category: Partial<CategoryUpdateType>) {
    const categoryFound = await this.findCategoryById({ id });
    const categoryUpdate = this.db.merge(categoryFound, category);

    return await this.db.save(categoryUpdate);
  }
  async delete(id: string) {
    const deleteCategory = await this.db.delete({
      id,
    });
    if (deleteCategory.affected === 0) {
      throw new Error("No category found");
    }

    return id;
  }
}