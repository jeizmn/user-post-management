1. Created a User Schema: Defined a schema for the user in Mongoose, including
fields like id , name , email . 
file name - user.js

2.Created a Post Schema: Created a Mongoose schema for posts that includes fields
such as id , title , content , userId (linked it with the User schema).
file name - post.js

3.MongoDB Database: Set up  done MongoDB as the backend database for
storing user and post data.

4.Create user api - POST -method /user.
    Testing example in postman
    Method POST -  localhost:3000/user
    Body- JSON
    {
    "user_id": 2,
    "name":"example",
    "email":"example@gmail.com"
    }

5.List user api - GET -method /user.
    Testing example in postman
    Method GET -  localhost:3000/user
    

6.Write posts - POST-method /posts.
    Testing example in postman
    Method POST -  localhost:3000/posts
    Body- JSON
   {
    "post_id":5,
    "title":"Example_Title",
    "content":"Example_Content",
    "userId": 1 (update the an existing user_id in the userSchema)
   }


7.List post - GET-method /posts.
    Testing example in postman
    Method GET -  localhost:3000/posts


8.Search post - GET-method /posts/search.
    Testing example in postman
    Method GET -  localhost:3000/posts/search
    In Postman, check your request URL to ensure that it includes the query parameter. 
    It should look something like http://localhost:3000/posts/search?query=your_search_term