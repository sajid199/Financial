# Financial
Financial Signup Form Application
This is a multi-step signup form application with a frontend built using HTML, CSS, Bootstrap, and JavaScript, and a backend built with Node.js, Express, and ClickHouse for data storage. The application allows users to fill out a series of forms (About, Account, Ownership, Financing) and save data to a ClickHouse Cloud database.
Project Structure
demo_form/
├── front-end/
│   └── index.html
├── back-end/
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md


front-end/: Contains the HTML file (index.html) for the multi-step form UI.
back-end/: Contains the Node.js/Express server (server.js), environment variables (.env), and dependencies (package.json).

Prerequisites
Before running the application, ensure you have the following installed:

Node.js (v16 or higher): Download and install Node.js.
ClickHouse Cloud Account: Sign up at ClickHouse Cloud and create a service to get connection details (host, username, password).
Git (optional): For cloning the repository, if applicable.
A modern web browser (e.g., Chrome, Firefox).

Setup
1. Clone or Set Up the Project
If the project is hosted in a repository, clone it:
git clone <repository-url>
cd demo_form

Alternatively, ensure the front-end and back-end folders are set up as described in the project structure.
2. Configure the Backend

Navigate to the Backend Folder:
cd back-end


Install Dependencies:Run the following command to install required Node.js packages:
npm install


Set Up Environment Variables:Create a .env file in the back-end folder with the following content:
CLICKHOUSE_URL=https://ikuq1pcfqs.asia-southeast1.gcp.clickhouse.cloud:8443
CLICKHOUSE_USERNAME=default
CLICKHOUSE_PASSWORD=<your-clickhouse-password>
CLICKHOUSE_DATABASE=default


Replace <your-clickhouse-password> with the password from your ClickHouse Cloud service.
Obtain the password from the ClickHouse Cloud console (under Connect or Settings). If lost, reset it in the console.


Verify ClickHouse Connectivity:Test the connection to ClickHouse Cloud using curl:
curl --user 'default:<your-clickhouse-password>' \
  --data-binary 'SELECT 1' \
  https://ikuq1pcfqs.asia-southeast1.gcp.clickhouse.cloud:8443


Replace <your-clickhouse-password> with the actual password.
A response of 1 indicates a successful connection.



3. Configure the Frontend

Navigate to the Frontend Folder:
cd ../front-end


Install live-server (Optional):To serve the frontend, install live-server globally:
npm install -g live-server



Running the Application
Follow these steps to start the backend and frontend servers.
1. Start the Backend Server

Navigate to the Backend Folder (if not already there):
cd back-end


Run the Server:
node server.js


Verify the Server:

The console should display:Server running at http://localhost:3000
Attempting to create users table...
Table "users" created or already exists.


If you see an authentication error (e.g., ClickHouseError: default: Authentication failed), verify the CLICKHOUSE_USERNAME and CLICKHOUSE_PASSWORD in .env and ensure your network allows connections to the ClickHouse host.



2. Start the Frontend Server

Navigate to the Frontend Folder:
cd ../front-end


Run live-server:
live-server


Access the Application:

Open your browser and go to http://127.0.0.1:8080.
You should see the multi-step signup form with the "About" step active.



Alternative: Serve Frontend via Backend
If you prefer to serve the frontend through the backend:

Add the following line to back-end/server.js before the routes:
app.use(express.static('../front-end'));


Restart the backend:
cd back-end
node server.js


Access the frontend at http://localhost:3000/index.html.


Using the Application

Fill Out the Form:

About Step: Enter personal information (First Name, Last Name, Address, Zip Code, Phone Number) and click "Next Step". The data is sent to the backend and saved in ClickHouse.
Account, Ownership, Financing Steps: Fill out the respective fields and click "Next Step" to progress. On the final step, click "Submit" to complete the form.
Use the "Previous Step" button to navigate backward.


Verify Data in ClickHouse:

Access http://localhost:3000/users (if the /users route is implemented in server.js) to see saved data.
Alternatively, log in to the ClickHouse Cloud console and run:SELECT * FROM users;





Troubleshooting

Backend Authentication Error:

If you see ClickHouseError: default: Authentication failed, verify the CLICKHOUSE_PASSWORD in .env. Reset the password in ClickHouse Cloud if needed.
Test connectivity with the curl command provided above.


Form Submission Fails:

Check the browser console (F12 > Console) for fetch errors (e.g., CORS, network issues).
Ensure the backend is running at http://localhost:3000 and the fetch URL in index.html is correct (http://localhost:3000/submit-form).


Frontend Not Loading:

Ensure live-server is running or the backend is serving the frontend correctly.
Check for 404 errors (e.g., favicon.ico) in the live-server logs; these can be ignored or resolved by adding a favicon.


Network Issues:

Ensure your network allows HTTPS connections to https://ikuq1pcfqs.asia-southeast1.gcp.clickhouse.cloud:8443.
In ClickHouse Cloud, check IP Filtering settings and allow your machine’s IP (or temporarily set to 0.0.0.0/0 for testing).



Notes

Security: Never commit the .env file to version control. Add it to .gitignore.
Production: Restrict ClickHouse Cloud IP filtering, use HTTPS, and consider additional validation for form inputs.
Extending the Application: To save data from the Account, Ownership, and Financing steps, update the users table and /submit-form endpoint in server.js.

For further assistance, refer to the ClickHouse Documentation or contact the project maintainer.
