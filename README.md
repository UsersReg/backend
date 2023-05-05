# Users Registration App Backend

## Getting started
- Clone the project and install the dependencies
```bash
 git clone https://github.com/UsersReg/backend.git
 npm install || yarn
```
- Rename `.env.example` file to `.env`
- Add variables to `.env` file
```
APP_PORT=your_app_port
DATABASE_URL="your_database_url"
```
- Run application with
```bash
npm run dev || yarn dev
```

## Endpoints
`GET` /users
> **Retrieve users from database.**
> If you want a specific user, you can filter by `id`, `name`, or `email` in request query
---
`POST` /users
> **Create a new user in database.**
> You need to specify `name`, and `email` and `password` in request body this way:
```json
{
    "data": {
        "name": "User Name Example",
        "email": "useremail@example.com",
        "password": "Encrypted User Password",
    }
}
```
---

`PUT` /users
> **Update a user in database.**
> You need to specify the data the same way as in the `POST` method;
> This route expects a `id` as parameter.
---

`DELETE` /users
> **Delete a user from database.**
> This route expects a `id` as parameter.
---

## Contributors

<a href="https://github.com/UsersReg/backend/graphs/contributors"><img src="https://contrib.rocks/image?repo=UsersReg/backend" /></a>
