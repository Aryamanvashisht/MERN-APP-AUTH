
#website Link:
[MERN-APP-AUTH](https://master--mernappauth.netlify.app/)


MERN APP AUTHENTICATION -

This project implements various authentication functionalities for user management. Below are the features included:

Register:

Users can register by providing necessary information such as username, email, and password. Validation checks ensure the uniqueness of the username and email. Login:

Registered users can log in using their username/email and password. Sessions are maintained securely to keep users authenticated throughout their visit. Password:

Passwords are securely hashed before being stored in the database to ensure data security. Password strength requirements are enforced to enhance security. Reset Password:

Users can initiate a password reset process in case they forget their password. A reset link is sent to the user's email for password recovery. OTP Generator:

One-Time Passwords (OTP) are generated for various authentication purposes. OTPs are time-based and unique for each request. OTP Verification:

Users can verify their identity using OTPs sent to their registered email or phone number. OTPs are validated against the generated OTPs to ensure authenticity. Email Nodemailer:

Nodemailer library is used to handle email sending functionalities. It enables the system to send emails for various purposes like registration confirmation, password reset, OTP verification, etc. MongoDB Atlas Database:

MongoDB Atlas cloud database is utilized for storing user data securely. MongoDB provides scalability and flexibility in managing user-related information. Profile Picture:

Users can upload and manage their profile pictures. Pictures are stored securely and associated with user accounts. Technologies Used Node.js Express.js MongoDB Atlas Nodemailer bcrypt (for password hashing) Multer (for handling file uploads) JWT (JSON Web Tokens) for session management Setup Instructions Clone the repository to your local machine. Install the required dependencies using npm install. Set up MongoDB Atlas and obtain the connection URI. Configure environment variables for MongoDB URI, email service credentials (if using Nodemailer), and other sensitive data. Start the server using npm start. Access the application in your browser. Contributing Contributions are welcome! Feel free to open issues or pull requests for any improvements or additional features you'd like to see implemented.



# Welcome to MERN Login System

Hello everyone, In this project, we are going to create **MERN Stack App with Login System**. 
We will take a look at how to create login, registration, profile, reset password routes and learn
how to send Mail from the Node.js backend application.

## Working with the Project

Download this project from above link. Create two configaration files into the project.
First in the client and second in the server.

In the Client Folder create .env file and put this code inside it.

.env
```
REACT_APP_SERVER_DOMAIN='<server_domain>' # example 'http://localhost:3000'
```


After that create a file in the Server Folder with the name config.js and put the below code inside it.

config.js
```
export default {
    JWT_SECRET : "<secret>",
    EMAIL: "steve.franecki@ethereal.email", // testing email & password
    PASSWORD : "sMf46xCzrvdrxvuagc",
    ATLAS_URI: "<MONGODB_ATLAS_URI>"
}
```

> **Note:** The **ATLAS_URI** is important to work this project.

Now, create all these variables in the project and make sure you set ATLAS_URI variable.
Otherwise, the project will not work.


License This project is licensed under the MIT License.
