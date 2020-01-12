# [Laravel](https://laravel.com/) and [Angular](https://angular.io/) Demo

## Requirements

1. Basic To Do CRUD 

  1.1. The user must be able to create a To Do item 
  
  1.2. The user must be able to delete a To Do item 
  
  1.3. The user must be able to edit a To Do item 
  
  1.4. The user must be able to mark the To Do item as completed 

2. User Authentication 

  2.1. A user must be able to create a new profile 
  
  2.2. The user must be able to log in and out 
  
  2.3. The user should only see his/her own To Do items 
  
  2.4. To Do items should not be accessible if user is not logged in 

3. User Profile 

  3.1. The user must be able to upload an avatar on his profile 
  
  3.2. The avatar must be displayed while logged in 
  
  3.3. The user must be able to change his/her first and last name 

4. Search To Do List 

  4.1. The user must be able to search for a specific To Do item  

## Setup

### Front-End Setup

Install [Node](https://nodejs.org/)

### Install Front-End Dependencies

```shell
cd todo-frontend
npm install -g @angular/cli
npm install
```

### Back-End Setup

Install [PHP](https://www.php.net/) (and activate the pdo_pgsql extension), [PostgreSQL](https://www.postgresql.org/) and [Laravel](https://laravel.com/docs/6.x#installing-laravel)

Create a PostgreSQL database called 'todo', set the credentials in .env, and run the migrations:

```shell
php todo-backend/artisan migrate
```

### Install Back-End Dependencies

```shell
cd todo-backend
php ../../composer.phar install
cd ..
```

## Run

### Run the Back-End

```shell
php todo-backend/artisan serve
```

Note: Errors are logged in /todo-backend/storage/logs

### Test the Front-End

```shell
cd todo-frontend
ng test
cd ..
```

### Run the Front-End

```shell
cd todo-frontend
ng serve
cd ..
```

### Build the Front-End

```shell
cd todo-frontend
ng build --prod --base-href /laravel-angular-demo/
cd ..
```

## Deploy

### Deploy the Back-End to Heroku

See [this article](https://devcenter.heroku.com/articles/getting-started-with-laravel).

### Deploy the Front-End to GitHub Pages

See [this article](https://help.github.com/en/articles/configuring-a-publishing-source-for-your-github-pages-site).
