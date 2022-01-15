# Library
Library is an internet-based application that provides users with details about books, authors, and publishers. It is specifically designed to be used by librarians and library users. The product will work as a complete user interface for library management process and library usage of ordinary users.

## technologies
In this MERN stack application the **frontend** is developed in HTML5, CSS3 and React.js Material UI library. **backend** is created in Express and Node.js. 
**Data** is stored in MongoDB Atlas.

## description and features
The Library System is an application that has: 
-CRUD operations for all entities with a simple search option for books, publishers, and authors. 
- The system maintains data associated with the books, authors, and publishers.
- The system does not allow users to register, retrieve passwords or edit their user details.
- The system allows librarians (admins) and library users to log in and out of the system.
- The system allows all users to select and see more details about books, authors, and publishers.
- The system allows only librarians (admins) to add, edit and delete books, authors, and publishers (full CRUD).


## starting and using the application

#### backend

After cloning repository and opening it, in terminal type command `cd server` and add your own .env file with following variables: **PORT** use 5000,  **MONGO_URI** use "mongodb+srv://**username**:**password**@pizzaordercomposer.n9nav.mongodb.net/**project_number**?retryWrites=true&w=majority" and **JWT_SECRET** . After that run `npm install` to install all the dependencies. This application requires data to be seeded before initial run. For that you should type `npm run seed` command while still inside server folder. After completing all these steps run `npm start` script. 

That runs the server part of application in the development mode on http://localhost:5000.

#### frontend

After you are done with backend part of application in terminal type command `cd client` and run `npm install` script to install all the dependencies. After successfull instalataion run `npm start`. 

That runs the frontend part of application in the development mode.

Open http://localhost:3000 to view it in the browser. You will be asked to login and you can do so with following credentials: 
- **librarian - admin**
- username: john
- password: $ch00l 

- **user**
- username: julio
- password: $ch00l



