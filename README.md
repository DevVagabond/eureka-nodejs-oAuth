# eureka-Nodejs-oAuth

eureka-Nodejs-oAuth is a nodejs project, integrated with netflix eureka server and zuul server for service registration and discovery.

## Installation

Use the package manager [npm] to install dependencies.

## eureka-service
open terminal and change directory to eureka-service folder and run command

```bash
mvn spring-boot:run
```
make sure you hjave latest jdk and maven is installed. It will take few minutes to download all the dependencies.

open ```localhost:8761``` to verify the eureka server is running.



## routing-service
open terminal and change directory to routing-service folder and run command after successfully running eureka-server 

```bash
mvn spring-boot:run
```
make sure you hjave latest jdk and maven is installed.

open ```localhost:8050``` to verify the eureka server is running.

you can see white lebel error message in the screen, that means it is working fine.

Also refresh the eureka server page on ```localhost:8761``` you can see one service is registered in application section.

## API-services

to spin up the API services using docker simply run ```docker-compose up``` from the root directory of the project, it will spin up the services with all the dependencies.

If you want to run the services individually then first we have to install the npm packages for those project and run      ```npm start``` to run the services from their individual folders respectively.

after running the services you can check in the eureka server that the services have registered themself.

## Usage

### ```step 1```:  
open ```localhost:8050/oauth/login```
### ```step 2``` : 
please click login to get redirected to github. after github login you will be redirected back to the localhost with a token. please use the token to communicate with other APIs.

base URL is:  localhost:8050/

## AWS Base URL: http://ec2-54-255-173-186.ap-southeast-1.compute.amazonaws.com:8050

## Login URL: http://ec2-54-255-173-186.ap-southeast-1.compute.amazonaws.com:8050/oauth/login

### Eureka server URL:   http://54.255.173.186:8761

there is postman collection attached in the root directory. import the collection into your postman to view all the APIs


## Note
I have attached environment file and pem fle for the ease of setup.
