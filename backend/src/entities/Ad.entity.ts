import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "ads"})
export default class AdEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    picture: string;
    
    @Column()
    location: string;

}