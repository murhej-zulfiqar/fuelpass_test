## Overview
This is the description of the test for Fuelpass
The goal is to build an API to handle fuel requests at the airports.

this project contains the Frontend project which represnts the UI and the backend project which represents the API.

### UI
The UI consists of the following pages:
 1. Login page 
 2. Orders Page 
 3. Request Fuel Page

```I assumed that the user will be added by another dashboard so there is no Signup page```

There is a data seeding that inserts the default roles and users into the database
and it will be executed once by the first startup

> The Orders page is authorized to users with Operations manager role
> the Request Fuel page is authorized to the users with Aircraft operator Role

### API
The API consists of the following endpoints

 1. /login
 2. /orders
 3. /orders/request
 4. /orders/requestForm
 5. /orders/updateOrderStatus
 

### Installation

the technologies and languages that are used in this project:

 1. Java 21 (Minimum required version is 17)
 2. Spring boot 3.6
 3. NodeJs 22 (Minimum required version is 20)
 4. PostgreSQL 13
 5. ReactJs 19
 6. NextJs 15
 7. Typescript 5
 8. Material UI 7.3

To start the project you have the following options
#### Option 1

 1. Install java and NodeJS
 2.  Install Java - NodeJs - PostgreSQL 
 3. for PostgreSQL create a DB with the name fuelpass and the schema public
 4. clone the project from git 

 `git clone https://github.com/murhej-zulfiqar/fuelpass_test.git`

 5. in the fuelpass folder ( backend ) check the application.properties file and adjust the db credentials

 `spring.datasource.url=jdbc:postgresql://db:5433/db_name  
spring.jpa.properties.hibernate.default_schema=public  
spring.datasource.username=db_user
spring.datasource.password=db_password`

 6. in the fuelpass folder ( backend ) execute the following command in the CMD 
 `mvn clean package -DskipTests` 
 
 to generate the jar from the maven structure
 7. once everything is good you can start the api by executing 

 `java -jar path_to_the_jar`

 8. once you finish with the api open the ui forlder ( frontend ) and in the CMD execute the following commands  
 `npm install` ,`npm build` 
 
 the first one is to install the packages and the second one is to build the UI application
 9. once the build is done you can run
 
 `npm start` 
 
 to start the application 

The API server will run on port `8080`
T he UI server will run on port `3000` 

#### Option 2
I provided a docker compose file and docker file for each project so you can run the project using docker without installing anything

 1. clone the project from git 

 `git clone https://github.com/murhej-zulfiqar/fuelpass_test.git`

 2. open the folder that is cloned from git and in CMD execute the following command 
 
 `docker compose -f fuelpass.yml up -d`


 3. this command will create container for the DB, Backend and Frontend 
 4. if everything is working fine you can test the UI and the API
 
 The API server will run on port `8080`
T he UI server will run on port `3000` 

### Test
URL: `http://localhost:3000`


default users:

Aircraft operator:  `username: aircraft_operator1@fuelpass.com / password: Operator@123`


Operations Manager `username: operation_manager1@fuelpass.com / password: Manager@123`

You can use those users to login and explore the pages and consume the APIs.

###Note 
I didn't add the uint test for the projects because I ran out of time to add proper unit test 

### USE of AI
I used the AI to debug some issues I faced while implementing the features, also AI helped me with the configuration of applications, gave me a snippet code for the JWT authentication.

  
 

