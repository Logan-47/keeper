# keeper

## To run locally
- `docker compose up`

## Keeper-frontend
- url: `localhost:3000
- Main sections is at `/manage` page.

## demo
<img src="./demo/keeper.gif"/>

## Kěeper-frontenď
- url: `localhost:9000`

## Keeper-backend API
- [Postman API Collection & Environment]("./apiCollection")

### Authentication
- Signup
```curl
  curl --location 'http://localhost:3000/api/v1/auth/signup' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "name": "test user",
      "email": "test3@gmail.com",
      "password": "password"
  }'
```

- Login
```curl
  curl --location 'http://localhost:3000/api/v1/auth/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "email": "test1@test.com",
      "password": "123445"
  }'
```

### Items

- Create Item
```curl
  curl --location 'http://localhost:3000/api/v1/items' \
  --header 'Authorization: Bearer 38rn1Ds9Uj5S/m61dA9UG04MZbbcr/SpYVaMowAafB0=' \
  --header 'Content-Type: application/json' \
  --data '{
      "name": "item_folder25",
      "icon": "😀"
  }'
```
- Get Item
```curl
curl --location 'http://localhost:3000/api/v1/items/43' \
--header 'Authorization: Bearer 38rn1Ds9Uj5S/m61dA9UG04MZbbcr/SpYVaMowAafB0='
```
- Get All Item
```curl
curl --location 'http://localhost:3000/api/v1/items' \
--header 'Authorization: Bearer 38rn1Ds9Uj5S/m61dA9UG04MZbbcr/SpYVaMowAafB0='
```

- Update Item
```curl
curl --location --request PUT 'http://localhost:3000/api/v1/items/9' \
--header 'Authorization: Bearer 38rn1Ds9Uj5S/m61dA9UG04MZbbcr/SpYVaMowAafB0=' \
--header 'Content-Type: application/json' \
--data '{
    "name": "updated Items"
}'
```

- Delete Item
```curl
curl --location --request DELETE 'http://localhost:3000/api/v1/items/2' \
--header 'Authorization: Bearer 38rn1Ds9Uj5S/m61dA9UG04MZbbcr/SpYVaMowAafB0='
```
- Move Item to Folder
```curl
curl --location 'http://localhost:3000/api/v1/items/' \
--header 'Authorization: Bearer 38rn1Ds9Uj5S/m61dA9UG04MZbbcr/SpYVaMowAafB0=' \
--header 'Content-Type: application/json' \
--data '{
    "name": "itemone",
    "icon": "😀"
}'
```

- reorder Items
```curl
curl --location 'http://localhost:3000/api/v1/items/reorder' \
--header 'Authorization: Bearer 38rn1Ds9Uj5S/m61dA9UG04MZbbcr/SpYVaMowAafB0=' \
--header 'Content-Type: application/json' \
--data '{
    "items": [
        {
            "id": 9,
            "position": 0
        },
        {`
            "id": 8,
            "position": 1
        }
    ]
}'
```

### Folders

- Create Folder
```curl
curl --location 'http://localhost:3000/api/v1/folders' \
--header 'Authorization: Bearer 38rn1Ds9Uj5S/m61dA9UG04MZbbcr/SpYVaMowAafB0=' \
--header 'Content-Type: application/json' \
--data '{
    "name": "my folder 8"
}'
```

- Get All Folder
```curl
curl --location 'http://localhost:3000/api/v1/folders' \
--header 'Authorization: Bearer 38rn1Ds9Uj5S/m61dA9UG04MZbbcr/SpYVaMowAafB0='
```

- Get Folder
```curl
curl --location 'http://localhost:3000/api/v1/folders/31' \
--header 'Authorization: Bearer 38rn1Ds9Uj5S/m61dA9UG04MZbbcr/SpYVaMowAafB0='
```
- Update Folder
```curl
curl --location --request PUT 'http://localhost:3000/api/v1/folders/25' \
--header 'Authorization: Bearer 38rn1Ds9Uj5S/m61dA9UG04MZbbcr/SpYVaMowAafB0=' \
--header 'Content-Type: application/json' \
--data '{
    "state": "CLOSED"
}'
```

- Delete Folder
```curl
curl --location --request DELETE 'http://localhost:3000/api/v1/folders/24' \
--header 'Authorization: Bearer 38rn1Ds9Uj5S/m61dA9UG04MZbbcr/SpYVaMowAafB0='
```





