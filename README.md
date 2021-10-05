# express-data-collection-cron

Test project which collects mock data and process it on a period using **node-cron**

## Project setup

```
  yarn install

  You have to have postgres installed and
  the table with the chosen name created

  create .env file and fill it like .env.example

  `PG_DB_USERNAME` is the username to postgresql
  `PG_DB_PASSWORD`  is the password to postgresql
  `PG_DB_NAME`  is the name of the table

```

### Compiles and hot-reloads for development

```
yarn start
```

### App work flow

```
There are three endpoints

  `/requestImageProcess` would request an image capture for process
  `/results` would ask for processed data

  `/processData` Bonus endpoint to speed up the process of the data
```
