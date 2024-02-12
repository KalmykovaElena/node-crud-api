## Installation

**The app was developed on **Node.js(v20 LTS)\*\*\*

### To install the project locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/KalmykovaElena/node-crud-api.git
```

2.  Change branch:

```
git checkout develop
```

3. Install dependencies:

```
npm i
```

## Usage

The following commands are available:

To start the server in 'development' mode

```
npm run start:dev
```

To start the server in 'production' mode

```
npm run start:prod
```
To starts multiple instances of application

```
npm run start:multi
```

To run tests

```
npm run test
```

## App info

Users are stored in DB as objects that have following properties:

- id — unique identifier (string, uuid) generated on server side
- username — user's name (string, required)
- age — user's age (number, required)
- hobbies — user's hobbies (array of strings or empty array, required)

### Endpoints

#### /api/users

- GET localhost:{PORT}/api/users is used to get all persons. Server answer with status code 200 and all users records.
- POST localhost:{PORT}/api/users is used to create record about new user and store it in database. Server answer with status code 201 and newly created record or with status code 400 and corresponding message if request body does not contain required fields.

#### /api/users/{userId}

GET localhost:{PORT}/api/users/{userId}
Server answer with:

- status code 200 and record with id === userId if it exists
- status code 400 and corresponding message if userId is invalid (not uuid)
- status code 404 and corresponding message if record with id === userId doesn't exist

PUT localhost:{PORT}/api/users/{userId} is used to update existing user
Server answer with:

- status code 200 and updated record
- status code 400 and corresponding message if userId is invalid (not uuid)
- status code 404 and corresponding message if record with id === userId doesn't exist

DELETE localhost:{PORT}/api/users/{userId} is used to delete existing user from database
Server answer with:

- status code 204 if the record is found and deleted
- status code 400 and corresponding message if userId is invalid (not uuid)
- status code 404 and corresponding message if record with id === userId doesn't exist