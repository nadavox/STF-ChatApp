# Messenger App - STF
This is a web-based messenger app built using JavaScript, HTML, CSS and Bootstrap. The app has three screens: the login screen, the register screen, and the chat screen.

## Getting Started
Clone the project to your local computer.
Open your terminal or command prompt and navigate to the project directory (chatapp is the directory of the project).
Run the following command to install the dependencies: npm install
Once the installation is complete, start the Express server by running the following command: npm start.
This will start the app in development mode. Open http://localhost:5000 in your browser to see the app.
Make sure you have MongoDB installed and running on your local machine to handle the database operations for the messenger app.

# Screens
### Login Screen
This screen allows existing users to log in to their accounts. Users will need to enter their username and password to access the app. Only registered users can connect to the app.

### Register Screen
This screen allows new users to create an account. Users will need to enter their username, password, display name and picture.
This screen allows new users to create an account. Users need to provide the following information to register successfully:

* A unique username containing at least one letter.
* A password that is at least 5 characters long and includes both numbers and letters.
* Password verification that matches the entered password.
* A display name that contains at least one letter.
* An image in the image file format. The image can be enlarged by clicking on it.

You can only register if all the details match. An indicator is shown on each field on mouseover.

### Chat Screen
This screen allows users to view all the chats they have created and communicate with their contacts. You can reach to this screen only if you are registerd, if not it will lead you to the login screen. The following functionalities are available:

* You can add contacts by clicking the add contact button.
* You can switch between different contacts.
* Messages can be sent to other users.
* You can log out and log in again.
* You can delete chat by clicking the delete chat button.
* Notifications are displayed when sending messages.
* Messages jump to the first place upon sending.

Note: All the client-side code is built inside the public folder of the server, so the app runs on the server with client-side rendering. The client is built using React.
