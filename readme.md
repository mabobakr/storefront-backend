# Storefront Backend
A storefront backend using typescript, express and postgreSQL.

## Installation
Clone the repo and run 
```
  npm install
```
to install all the dependencies. 

## Database setup
- First of all, you need to install postgres and its command line tools.
- In the interactive postgres terminal, create a new user
```
  CREATE USER store_user with password 'password123';
```

- Create the dev and test databases.
```
  CREATE DATABASE storefront_dev;
  CREATE DATABASE storefront_test;
```
- Grant all privileges to the user on the databases
```
  GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO store_user;
  GRANT ALL PRIVILEGES ON DATABASE storefront_test TO store_user;

```

## Note on database setup
 - You can change the name of user, password, databases names in the previous section, just make sure
 to change them in the .env file

- If your database is running on a port other than 5432, just change it in the .env file


## How to use
- create a .env folder similar to .env_template and populate it with your data
- run ``` npm run build ``` to build the project
- run ``` npm run start ``` to start the server
- you can use ``` npm run watch ``` to watch for changes in the files and restart the server if any.
- refer to REQUIRMENTS.md for the API Documentation



## To run tests
run ``` npm run test ```

## linting and formatting

- run ``` npm run eslint ``` to lint the code
- run ``` npm run prettier ``` to format the code


