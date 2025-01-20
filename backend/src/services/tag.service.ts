import TagRepository from '../repositories/Tag.repository';
import { In } from 'typeorm';
import { TagCreateType, TagUpdateType } from '../types/tags';

export default class TagService {
  db: TagRepository;

  constructor() {
    this.db = new TagRepository();
  }

  async listTags() {
    return await this.db.find();
  }

  async findMultipleTagsByIds(ids: string[]) {
    const tags = await this.db.find({ where: { id: In(ids) } });
    if (tags.length === 0) {
      throw new Error("No Tag found");
    }
    return tags;
  }

  async findTagById(id: string) {
    const tag = await this.db.findOne({ where: { id } });
    if (!tag) {
      throw new Error("No Tag found");
    }
    return tag;
  }

  async create(tag: TagCreateType) {
    const newTag = await this.db.save(tag);
    return newTag;
  }

  async update(id: string, tag: Partial<TagUpdateType>) {
    const tagFound = await this.findTagById(id);
    const tagUpdate = this.db.merge(tagFound, tag);

    return await this.db.save(tagUpdate);
  }

  async delete(id: string) {
    const deleteTag = await this.db.delete({ id });
    if (deleteTag.affected === 0) {
      throw new Error("No Tag found");
    }
    return id;
  }
}