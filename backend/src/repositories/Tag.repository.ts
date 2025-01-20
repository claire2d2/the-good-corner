 import { Repository } from "typeorm";
 // like a catalog of many requests
 import TagEntity from "../entities/Ad.entity";
 import datasource from "../lib/datasource";

 export default class TagRepository extends Repository<TagEntity> {
    constructor() {
        super(TagEntity, datasource.createEntityManager())
    }
 }