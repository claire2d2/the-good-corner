import { Ad, AdWithoutId } from "../types/ads";
import sqlite3 from "sqlite3";

let adsList: Ad[] = [
	{
		id: "1",
		title: "titre 1",
		description: "description 1",
		price: 15.0,
		picture: "",
		location: "Toulouse",
	},
	{
		id: "2",
		title: "titre 2",
		description: "description 2",
		price: 30.0,
		picture: "",
		location: "Toulouse",
	},
];

export default class AdService {
	db: sqlite3.Database;

	constructor() {
		this.db = new sqlite3["Database"]("good_corner.sqlite");
	}

	async listAds() {
		return new Promise<Ad[]>((resolve, reject) => {
			this.db.all<Ad>("SELECT * from ads", (err, rows) => {
				if (err) {
					reject(err.message);
				}
				resolve(rows);
			});
		});
	}

	async findAdById(id: string) {
		return new Promise<Ad>((resolve, reject) => {
			this.db.get<Ad>("SELECT * FROM ads WHERE id = (?)", [id], (err, row) => {
				if (err) {
					reject(err.message);
				}
				if (!row) {
					reject(`Ad with id ${id} not found.`);
				}
				resolve(row);
			});
		});
	}

	create(ad: Ad) {
		return new Promise<Ad>((resolve, reject) => {
			this.db.run(
				"INSERT INTO ads (id, title, description, price, picture, location) VALUES (?, ?, ?, ?, ?, ?)",
				[ad.id, ad.title, ad.description, ad.price, ad.picture, ad.location],
				(err: any) => {
					if (err) {
						reject(err.message);
					}
					resolve({...ad});
				}
			);
		});
	}

    async delete(id: string) {
        return new Promise<string>((resolve, reject) => {
            this.db.run("DELETE FROM ads where id = (?)", [id], function (err: any) {
                if(err) {
                    reject(err.message)
                }
                if (this.changes === 0) {
                    reject("The ad does not exist")
                }
                resolve(id)
            })
        })
    }

    async update(id: string, ad: AdWithoutId<Ad>) {
        return new Promise<Ad>(async (resolve, reject) => {
            try {
              const adFound = await this.findAdById(id);
              Object.keys(ad).forEach((k) => {
                //title, description, picture, location, price
                if (ad[k]) {
                  // si title n'est pas undefined :  if ad.title
                  adFound[k] = ad[k]; // title de l'annonce trouvée est égal au titre reçu adFound.title = ad.title
                }
              });
              this.db.run(
                "UPDATE ads SET title = ?, description = ?, picture = ?, location = ?, price = ? WHERE id = ?",
                [
                  adFound.title,
                  adFound.description,
                  adFound.picture,
                  adFound.location,
                  adFound.price,
                  id,
                ],
                function (err) {
                  if (err) {
                    reject(err.message);
                  }
                  if (this.changes === 0) {
                    reject("The ad doesn't exist");
                  }
      
                  resolve(adFound);
                }
              );
            } catch (err) {
              reject(err);
            }
          });
    }
}


// update(id: string, ad: AdWithoutId<Ad>) {
// let adToUpdate = this.findAdById(id)
// // if identical keys, the keys will be replaced by the last one
// // adToUpdate = {...adToUpdate, ...ad}
// Object.keys(ad).forEach((k) => {
//     if(ad[k] && adToUpdate) {
//         adToUpdate[k] = ad[k]
//     }
// })
// return adToUpdate
// }
// }
