import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
    OneToMany
} from "typeorm";
import AdEntity from "./Ad.entity";

@Entity({name: "categories"})
export default class CategoryEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	title: string;

    @OneToMany(() => AdEntity, (ad) => ad.category)
    ads: AdEntity[]

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
