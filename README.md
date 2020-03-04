# severless-graphql-sample
Using serverless nodejs in graphql with postgress SQL

# create a serverless project
npm install -g serverless

and confiure serverless

# Clone the project 
Clone the project

# Change into the newly created directory 
cd severless-graphql-sample

# install all dependencies
npm install

# Note: You can delete first.js  and second.js file if needed or work with same

# To install appolo server lamda and graphql
npm install apollo-server-lambda graphql

# To run the lamda offline
npm install serverless-offline

# To start locally
sls offline start

# To deploy it in AWS 
sls deploy --stage stage

# create a .env file and add the following values 
# Note change vales as per your details

dev:
  APP_NAME: severless-graphql-sample
  NODE_ENVIRONMENT: dev
  HOST:  your postgress SQL host
  USER_NAME: your database name
  PASSWORD: your database password
  DATABASE: your database  
  SECURITY_GROUP_ID: security group id
  SUBNET_1: subnet 1 
  SUBNET_2: subnet 2



  