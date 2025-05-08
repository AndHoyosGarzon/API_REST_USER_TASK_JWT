# API REST Todo List with JWT Tokens

* The API was created with the following technologies: 
                
                - Express JS
                - Bcrypt Js
                - Jwt JS
                - PostgresSql PG

* If you want to run this API locally, please follow the instrutions:
                
                1- Clone the repository
                2- Run npm install in root
                3- Run npm run dev to start the server

* You cant me request with clients such as Postman or Thunder Client to the following endpoints:

## Users Endpoints 
    
    POST /user/register

            * Request the following data, firstname, lastname, email, password and returns access token to continue 
              with the next login endpoint. 


    POST /user/login

            * You log in only with your email and password. Keep in mind that the access token received in the 
              register must go in the header as a Bearer token.


    PATCH /user/updateUser

            * This endpoint receives firstname, lastname, password and modifies the database.


    DELETE /user/deleteUser

            * This endpoint deletes a user whit the decrypted ID of the token that allows the API to work.


## Tasks Endpoints 

    GET  /task/get_all_task

            * This endpoint gets all tasks created by a user.


    POST /task/create_task

            * It allows you to create a task by requesting a title and description.
              Only users registered in the database can create it, since each task 
              is assosiated with each user.


    PATCH /task/update_task

            * Modify a specific task created by a user.


    DELETE /task/delete_task

            * This endpoint deletes a task created by a user and request the taskId in the request body.



