import { Ad } from "../../types/Ad"
import CardAd from "./CardAd"

const tempAds: Ad[] = [
    {
        "id": "be62a299-2880-4623-b15d-26cf18a7be78",
        "title": "ACDC Ticket",
        "description": "Can't go :(",
        "price": 24,
        "picture": "",
        "location": "Lyon",
        "created_at": "2025-01-19T21:39:33.000Z",
        "updated_at": "2025-01-19T21:39:33.000Z",
        "category": {
            "id": "beb62128-f739-435d-be44-dcc748356f1c",
            "title": "Tickets",
            "created_at": "2025-01-19T21:11:54.000Z",
            "updated_at": "2025-01-19T21:11:54.000Z"
        },
        "tags": []
    },
    {
        "id": "fe0b9025-d14c-434d-ba5b-6fd3e471faf9",
        "title": "Black Pink",
        "description": "Can't go :(",
        "price": 150,
        "picture": "",
        "location": "Paris",
        "created_at": "2025-01-19T21:40:08.000Z",
        "updated_at": "2025-01-19T21:40:08.000Z",
        "category": {
            "id": "beb62128-f739-435d-be44-dcc748356f1c",
            "title": "Tickets",
            "created_at": "2025-01-19T21:11:54.000Z",
            "updated_at": "2025-01-19T21:11:54.000Z"
        },
        "tags": []
    },
    {
        "id": "f84cde6a-43de-4635-af70-2c15e79bd919",
        "title": "Pink Tshirt",
        "description": "only worn once",
        "price": 10.8,
        "picture": "",
        "location": "Paris",
        "created_at": "2025-01-19T21:40:41.000Z",
        "updated_at": "2025-01-19T21:40:41.000Z",
        "category": {
            "id": "502bd6ee-afb5-4063-b038-7e6d25084bec",
            "title": "Clothes",
            "created_at": "2025-01-19T21:15:44.000Z",
            "updated_at": "2025-01-19T21:15:44.000Z"
        },
        "tags": []
    },
    {
        "id": "f84cde6a-43de-4635-af70-2c15e79bd339",
        "title": "Pink Bra",
        "description": "only worn once",
        "price": 10,
        "picture": "",
        "location": "Paris",
        "created_at": "2025-01-19T21:40:41.000Z",
        "updated_at": "2025-01-19T21:40:41.000Z",
        "category": {
            "id": "502bd6ee-afb5-4063-b038-7e6d25084bec",
            "title": "Clothes",
            "created_at": "2025-01-19T21:15:44.000Z",
            "updated_at": "2025-01-19T21:15:44.000Z"
        },
        "tags": []
    }
]

const ListAds= () => {
  return (
    <div className="grid grid-cols-2">
      {tempAds.map((ad) => {
            return <CardAd key={ad.id} ad={ad} />
      })}
    </div>
  )
}

export default ListAds
