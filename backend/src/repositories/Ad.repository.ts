 import { Repository } from "typeorm";
 // like a catalog of many requests
 import AdEntity from "../entities/Ad.entity";
 import datasource from "../lib/datasource";

 export default class AdRepository extends Repository<AdEntity> {
    constructor() {
        super(AdEntity, datasource.createEntityManager())
    }
 }