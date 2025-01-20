import AdRepository from '../repositories/Ad.repository';
import CategoryEntity from '../entities/Category.entity';
import CategoryService from './category.service';
import TagEntity from '../entities/Tag.entity';
import TagService from './tag.service';
import { AdCreateType, AdUpdateType, FilterType } from '../types/ads';
import { validate } from 'class-validator';

export default class AdService {
  db: AdRepository;

  constructor() {
    this.db = new AdRepository();
  }

  async listAds(options: FilterType) {
    return await this.db.find({
      relations: ["category", "tags"],
      order: { created_at: options.order ?? "ASC" },
      take: options.limit,
    });
  }

  async findAdById(id: string) {
    const ad = await this.db.findOne({
      where: { id },

      relations: ["category", "tags"],
    });
    if (!ad) {
      throw new Error("No ad found");
    }
    return ad;
  }

  async create({ tagsIds, categoryId, ...ad }: AdCreateType) {
    let tags: TagEntity[] = [];
    if (tagsIds.length > 0) {
      tags = await new TagService().findMultipleTagsByIds(tagsIds);
    }
    const newAd = this.db.create({
      ...ad,
      tags,
      category: { id: categoryId },
    });
    const errors = await validate(newAd);
    if (errors.length > 0) {
      throw new Error(errors[0].value);
    }
    await this.db.save(newAd);
    return newAd;
  }
  async update(id: string, { tagsIds, categoryId, ...ad }: AdUpdateType) {
    let tags: TagEntity[] = [];
    const category: CategoryEntity =
      await new CategoryService().findCategoryById({ id: categoryId });
      console.log("CATEGORY", category);
    if (tagsIds && tagsIds.length > 0) {
      tags = await new TagService().findMultipleTagsByIds(tagsIds);
    }
    const adFound = await this.findAdById(id);
    const adUpdate = this.db.merge(adFound, { ...ad, tags, category });
    return await this.db.save(adUpdate);
  }

  async delete(id: string) {
    const deletedAd = await this.db.delete({
      id,
    });

    if (deletedAd.affected === 0) {
      throw new Error("No ad found");
    }

    return id;
  }
}