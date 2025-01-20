import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
    ManyToMany
} from "typeorm";
import { Tag } from "../types/tags";
import AdEntity from "./Ad.entity";
import { Ad } from "../types/ads";

@Entity({name: "tags"}) 
export default class TagEntity {

    @PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
    // add transformer to everything?
	label: string;

    @CreateDateColumn({nullable: true})
	created_at?: Date;

	@UpdateDateColumn({nullable: true})
	updated_at?: Date;
}