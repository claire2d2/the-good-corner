import { Repository } from "typeorm";
import CategoryEntity from "../entities/Category.entity";
import datasource from "../lib/datasource";

export default class CategoryRepository extends Repository<CategoryEntity> {
    constructor() {
        super(CategoryEntity, datasource.createEntityManager())
    }

    
 }