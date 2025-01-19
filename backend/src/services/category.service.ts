import { Category, CategoryWithoutId } from "../types/category";
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

        create(cat: Category) {
            return new Promise<Category>((resolve, reject) => {
                this.db.run(
                    "INSERT INTO categories (id, title) VALUES (?, ?)",
                    [cat.id, cat.title],
                    (err: any) => {
                        if (err) {
                            reject(err.message);
                        }
                        resolve({...cat});
                    }
                );
            });
        }

        update(id: string, cat: CategoryWithoutId) {
            return new Promise((resolve, reject) => {
                this.db.run("UPDATE categories SET title = ? WHERE id = ?", [cat.title, id], function(err) {
                    if (err) {
                        reject(err.message)
                    }
                    if (this.changes === 0) {
                        reject ("The category doesn't exist")
                    }
                    resolve(id)
                })
            })
        }

        delete(id: string) {
            return new Promise((resolve, reject) => {
                this.db.run("DELETE categories WHERE id = ?", [id], function(err) {
                    if (err) {
                        reject (err.message)
                    }
                    if (this.changes === 0) {
                        reject ("The category doesn't exist")
                    }
                    resolve(id)
                })
            })
        }
    

}