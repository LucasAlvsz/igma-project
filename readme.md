<p align="center"></br>
      <img src="https://s3.sa-east-1.amazonaws.com/remotar-assets-prod/company-profile-pictures/clckmivxl005j04w68vyd1nt3.jpg" alt="igma logo"/>
</p>

</br>
<h1 align="center">
  Igma Project
  </br>
</h1>
<div align="center">

  <h3>Built With</h3>

  <img alt= "typescript logo" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img alt= "node.js logo" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" height="30px"/>
  <img alt= "express logo" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" height="30px"/>
 
  <img alt= "postgresql logo" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img alt= "prisma logo" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
 
  <img alt= "jest logo" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" height="30px"/>
  <img alt= "docker logo" src="https://img.shields.io/badge/Docker-228FE1?style=for-the-badge&logo=docker&logoColor=white" height="30px"/>

<img alt= "aws logo" src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" height="30px"/>

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

## Description

Igma project is a RESTful API project built using TypeScript. The project provides sign-up and user management functionalities.
</br>

## Features

-   Sign-up
-   Get all users
-   Get user by cpf

</br>

## Demo

The application has been deployed to AWS EC2 and is available for testing at http://ec2-18-228-220-146.sa-east-1.compute.amazonaws.com/

Please note that this is just for testing purposes and the environment may not be configured for production use.

## Table of Contents

-   [API Reference](#api-reference)

    -   [Sign-up](#sign-up)
    -   [Get all users](#get-all-users)
    -   [Get user by cpf](#get-user-by-cpf)

-   [Environment Variables](#environment-variables)

-   [Run Locally](#run-locally)

-   [Run Tests](#run-tests)

## API Reference

#### Sign-up

```http
POST /sign-up
```

#### Request:

| Body       | Type     | Description   |
| :--------- | :------- | :------------ |
| `name`     | `string` | **Required**. |
| `cpf`      | `string` | **Required**  |
| `birhDate` | `Date`   | **Required**. |

`cpf-format`: `000.000.000-00` or `00000000000`

#

#### Get all users

```http
GET /users
```

#### Request:

| Query   | Type     | Description                                    |
| :------ | :------- | :--------------------------------------------- |
| `page`  | `number` | **Optional** `min: 1` `default: 1`             |
| `limit` | `number` | **Optional** `min: 1` `max: 100` `default: 10` |

#### Response:

```json
[
	[
		{
			"id": 1,
			"cpf": "424.526.254-00",
			"name": "Maria Vitória Gomes",
			"birthDate": "1983-04-11T05:22:45.658Z"
		},
		{
			"id": 2,
			"cpf": "28536165685",
			"name": "Lena Ledner",
			"birthDate": "1947-01-04T18:44:44.920Z"
		}
	]
]
```

#

#### Get user by cpf

```http
GET /users/:cpf
```

#### Request:

| Params | Type     | Description  |
| :----- | :------- | :----------- |
| `cpf`  | `string` | **Required** |

`cpf-format`: `000.000.000-00` or `00000000000`

#### Response:

```json
{
	"id": 46,
	"name": "Maria Laura Melo",
	"birthDate": "1992-11-14T01:34:52.426Z",
	"cpf": "330.502.155-18"
}
```

</br>

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

##### Without Docker:

`DATABASE_URL = postgres://username:password@hostname:5432/databasename`

`PORT = 5000 or any port you want`

#

##### With Docker:

`PORT = 5000 or any port you want`

`POSTGRES_USER = postgres`

`POSTGRES_PASSWORD = postgres`

`POSTGRES_DB = igma-project`

`POSTGRES_HOST = igma-postgres-db`

`DATABASE_URL = postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}`

</br>

## Run Locally

> Remember to create a .env file with the environment variables in the root of the project.

### Without Docker:

> You will need to have Node.js and PostgreSQL installed on your machine

Clone the project

```bash
  git clone git@github.com:LucasAlvsz/igma-project.git
```

Go to the project directory

```bash
  cd igma-project/
```

Install the dependencies

```bash
  npm install
```

Create environment variables file and add the environment variables

```bash
  touch .env
```

> Remember to change the values of the environment variables to your own.

Unix based systems:

```bash

echo "PORT=5000" > .env
echo "DATABASE_URL=postgres://username:password@hostname:5432/databasename" >> .env

```

Windows:

```bash
echo PORT=5000 > .env
echo DATABASE_URL=postgres://username:password@hostname:5432/databasename >> .env
```

Run the app

```bash
  npm run start
```

> The app will be running on http://localhost:5000/ by default.

#

### With Docker [recommended]:

> You will need to have Docker and Docker Compose installed on your machine

Clone the project

```bash
  git clone git@github.com:LucasAlvsz/igma-project.git
```

Go to the project directory

```bash
  cd igma-project/
```

Create environment variables file and add the environment variables

Unix based systems:

```bash
  touch .env
```

```bash
echo "PORT=5000" > .env
echo "POSTGRES_USER=postgres" >> .env
echo "POSTGRES_PASSWORD=postgres" >> .env
echo "POSTGRES_DB=igma-project" >> .env
echo "POSTGRES_HOST=igma-postgres-db" >> .env
echo "DATABASE_URL=postgres://\${POSTGRES_USER}:\${POSTGRES_PASSWORD}@\${POSTGRES_HOST}:5432/\${POSTGRES_DB}" >> .env

```

Windows:

```bash
echo PORT=5000 > .env
echo POSTGRES_USER=postgres >> .env
echo POSTGRES_PASSWORD=postgres >> .env
echo POSTGRES_DB=igma-project >> .env
echo POSTGRES_HOST=igma-postgres-db >> .env
echo DATABASE_URL=postgres://%POSTGRES_USER%:%POSTGRES_PASSWORD%@%POSTGRES_HOST%:5432/%POSTGRES_DB% >> .env

```

Run the app

```bash
  docker-compose up
```

> The app will be running on http://localhost:80/ by default.

</br>

## Run Tests

### Without Docker:

> Follow the steps to run the app without Docker but instead of running the app, run the following commands:

Deploy the database schema

```bash
  npm run prisma:deploy
```

Run the tests

```bash
  npm run test
```

### With Docker:

> Follow the steps to run the app with Docker until "Go to the project directory" and then run the following commands:

Create environment variables file and add the environment variables

Unix based systems:

```bash
  touch .env.test
```

```bash
echo "PORT=5000" > .env.test
echo "POSTGRES_USER=postgres" >> .env.test
echo "POSTGRES_PASSWORD=postgres" >> .env.test
echo "POSTGRES_DB=igma-project-test" >> .env.test
echo "POSTGRES_HOST=database-ci" >> .env.test
echo "DATABASE_URL=postgres://\${POSTGRES_USER}:\${POSTGRES_PASSWORD}@\${POSTGRES_HOST}:5432/\${POSTGRES_DB}" >> .env.test

```

Windows:

```bash
echo PORT=5000 > .env.test
echo POSTGRES_USER=postgres >> .env.test
echo POSTGRES_PASSWORD=postgres >> .env.test
echo POSTGRES_DB=igma-project-test >> .env.test
echo POSTGRES_HOST=database-ci >> .env.test
echo DATABASE_URL=postgres://%POSTGRES_USER%:%POSTGRES_PASSWORD%@%POSTGRES_HOST%:5432/%POSTGRES_DB% >> .env.test

```

Run the tests

```bash
  docker-compose -f docker-compose-tests.yml run api-ci npm run test:remote
```

#

## Authors

-   [@LucasAlvsz](https://www.github.com/LucasAlvsz) 🪐

<br/>

#

<a  href="mailto:contato.lucasalv@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg"></a>
