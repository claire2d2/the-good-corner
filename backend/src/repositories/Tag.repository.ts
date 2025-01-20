 import { Repository } from "typeorm";
 // like a catalog of many requests
 import TagEntity from "../entities/Ad.entity";
 import datasource from "../lib/datasource";

 export default class TagRepository extends Repository<TagEntity> {
    constructor() {
        super(TagEntity, datasource.createEntityManager())
    }

    async findTagByIdWithAds(id: string) {
            const adsRepository = new TagRepository();
            const tag = await this.findOne({ where: { id } });
            if (!tag) {
                throw new Error("No tag found");
            }
            const ads = await adsRepository
                .createQueryBuilder("ad")
                .where("ad.tags LIKE :id", [`%${id}%`] )
                .orderBy("ad.created_at")
                .getMany();
            return { ...tag, ads };
        }
 }