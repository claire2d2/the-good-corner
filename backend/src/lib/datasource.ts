import { DataSource } from "typeorm";

export default new DataSource({
    type: "sqlite",
    database: "good_corner_orm.sqlite",
    entities: [],
    synchronize: true, // set to false for prod
    logging: ["error", "query"]
})