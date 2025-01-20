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

    @OneToMany(() => AdEntity, (ad) => ad.category, {nullable: true})
    ads?: AdEntity[]

	@CreateDateColumn({nullable: true})
	created_at?: Date;

	@UpdateDateColumn({nullable: true})
	updated_at?: Date;
}
