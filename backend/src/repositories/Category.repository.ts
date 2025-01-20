import AdRepository from './Ad.repository';
import CategoryEntity from '../entities/Category.entity';
import datasource from '../lib/datasource';
import { CategoryFindWithParams } from '../types/category';
import { Repository } from 'typeorm';

export default class CategoryRepository extends Repository<CategoryEntity> {
  constructor() {
    super(CategoryEntity, datasource.createEntityManager());
  }

  /**======================
   *?    On pourra rajouter de nouvelles fonctions à notre catalogue de requêtes
   *========================**/

  async findCategoryByIdWithLimitAds({ id, limit }: CategoryFindWithParams) {
    const adsRepository = new AdRepository();
    const category = await this.findOne({
      where: { id },
    });
    if (!category) {
      throw new Error("No Category found");
    }
    const ads = await adsRepository.find({
      where: { category: { id } },
      order: { created_at: "DESC" },
      take: limit ? parseInt(limit) : undefined,
    });
    /**======================
     *    Exemple de query builder
     *========================**/
    // const ads = await adsRepository.createQueryBuilder("ad")
    //   .where("ad.categoryId = :id", { id })
    //   .orderBy("ad.created_at", "DESC")
    //   .take(+limit)
    //   // .take(parseInt(limit))
    //   .getMany();

    return { ...category, ads };
  }
}