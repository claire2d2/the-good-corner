import { Category } from "../types/category";
import sqlite3  from "sqlite3";

export default class CategoryService {

    db: sqlite3.Database;
    
        constructor() {
            this.db = new sqlite3["Database"]("good_corner.sqlite");
        }

        listCategories() {
            return new Promise<Category[]>((resolve, reject) => {
                        this.db.all<Category>("SELECT * from categories", (err, rows) => {
                            if (err) {
                                reject(err.message);
                            }
                            resolve(rows);
                        });
                    });
        }
    

}