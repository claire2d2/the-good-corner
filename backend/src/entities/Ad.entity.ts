import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
    ManyToMany,
    ManyToOne
} from "typeorm";
import CategoryEntity from "./Category.entity";
import { Category } from "../types/category";
import { Tag } from "../types/tags";
import TagEntity from "./Tag.entity";

@Entity({ name: "ads" })
export default class AdEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column({ type: "float" }) // so that TypeORM does not interpret number as an integer
	price: number;

	@Column()
	picture: string;

	@Column()
	location: string;

    @ManyToOne(() => CategoryEntity,(category: Category) => category.ads )
    category: CategoryEntity;

	@ManyToMany(() => TagEntity, (tag: Tag ) => tag.ads)
	tags: TagEntity;

	@CreateDateColumn({nullable: true})
	created_at?: Date;

	@UpdateDateColumn({nullable: true})
	updated_at?: Date;
}
