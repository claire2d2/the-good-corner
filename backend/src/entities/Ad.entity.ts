import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
    OneToMany,
    ManyToOne
} from "typeorm";
import CategoryEntity from "./Category.entity";
import { Category } from "../types/category";

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

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
