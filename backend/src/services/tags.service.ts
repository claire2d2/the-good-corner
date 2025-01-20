import TagRepository from "../repositories/Tag.repository";
import TagEntity from "../entities/Tag.entity";

export default class TagService {
	db: TagRepository;

	constructor() {
		this.db = new TagRepository();
	}

	async listTags() {
		return await this.db.find({ relations: ["ads"] });
	}

	async findTagById(id: string) {
		const foundTag = await this.db.findOne({ where: { id } });
		if (!foundTag) {
			throw new Error("The ad does not exist");
		}
		return foundTag;
	}

	async create(tag: Omit<TagEntity, "id">) {
		const newTag = await this.db.save({
			...tag,
		});
		return newTag;
	}

	async delete(id: string) {
		const deletedTag = await this.db.delete({ id });
		if (deletedTag.affected === 0) {
			throw new Error("This ad does not exist");
		}
		return id;
	}

	async update(id: string, tag: TagEntity) {
		const TagToUpdate = await this.findTagById(id);
		if (!TagToUpdate) {
			throw new Error("This ad does not exist");
		}
		const updatedAd = this.db.merge(TagToUpdate, tag);
		return updatedAd;
	}
}
