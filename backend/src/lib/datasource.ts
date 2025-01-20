import { DataSource } from "typeorm";
import AdEntity from "../entities/Ad.entity";
import CategoryEntity from "../entities/Category.entity";
import TagEntity from "../entities/Tag.entity";


export default new DataSource({
    type: "sqlite",
    database: "good_corner_orm.sqlite",
    entities: [AdEntity, CategoryEntity, TagEntity],
    // entities: ["/src/entities/*"],
    synchronize: true, // set to false for prod
    logging: ["error", "query"]
})