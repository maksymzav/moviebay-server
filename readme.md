#Server for MovieBay project

##How to start

`npm install`

`npm start`

Your server is available on http://localhost:3000.

##Preconditions
You need to have Node.js 6+ and MongoDB 3+ installed and running on your computer.

##Server API
###`GET /users` - get the list of users

Example response body:
```
{
   "statusCode": 200,
   "data": [
     {
       "id": "57ea34df02e83a76b3d1ed95",
       "login": "login",
       "password": "password"
     }
   ]
 }
 ```
 
###`GET /users/id/{id}` - get one user by id
###`GET /users/login/{login}` - get one user by login
 
 Example response:
 ```
 {
   "statusCode": 200,
   "data": {
     "id": "57ea34df02e83a76b3d1ed95",
     "login": "login",
     "password": "password"
   }
 }
 ```
 
 Error example:
 ```
 {
   "statusCode": 404,
   "message": "User not found."
 }
 ```
 
 
###`POST /users` - create a new user
 
Example request body:
```
{
  "login": "orin_x",
  "password": "qwerty12"
}
```

Example response body:
```
{
     "statusCode": 201
}
 ```

