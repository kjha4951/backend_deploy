## _Project API Documentation_
 
# Book_store
## to run the application : npm start or npx nodemon
_node version v18.17.1
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# book API
## Register
Endpoint: [https://backend-deploy-2jqr.onrender.com/api/book/register]\
Method: Post\
Request Payload:
```
{
    "email": "YOUR EMAIL ID",
    "password": "YOUR PASSWORD"
}
 
```
Description: REGISTER USER FIRST it will create an access token for login the user.


 
## LOGIN
Endpoint: [https://backend-deploy-2jqr.onrender.com/api/book/login] \
Method: POST \
Request Payload:
```
{
    "email": "YOUR EMAIL ID",
    "password": "YOUR PASSWORD"
}
 
```
Description: login the register user there will be create an access token with that user get the access and able to perform.
 
## then Get the list of the book 
Endpoint: [https://backend-deploy-2jqr.onrender.com/api/book] \
Method: GET \
Headers:
Authorization: Bearer <access_token>
Description: Find the List of books
add headers: Authorization
and paste the access token as a value which you get from the login .
 
## Add book
Endpoint: [https://backend-deploy-2jqr.onrender.com/api/book] \
Method: POST \
Headers:
Authorization: Bearer <access_token>
Request Payload:
```
{
    "title": "Book name",
    "author": "Author name"
}
 
```
Description: we add the book from this api and it will add it on the list .
add headers: Authorization
and paste the access token as a value which you get from the login .






 

