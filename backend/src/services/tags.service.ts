import TagRepository from "../repositories/Tag.repository";
import TagEntity from "../entities/Tag.entity";

export default class TagService {
    db: TagRepository;

    constructor() {
        this.db = new TagRepository();
    }

}