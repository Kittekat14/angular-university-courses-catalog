# Angular University Courses Overview

## Installation pre-requisites

Please use Node 18 long-term support (LTS) version.

## Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

    npm install -g @angular/cli

## How To install this repository

We can install the main branch using the following command:

    git clone https://github.com/Kittekat14/angular-university-courses-catalog.git
  
Then you move into the downloaded repository and install all dependencies in your dev environment:

    cd angular-university-courses-catalog
    npm install

This should take a couple of minutes. 

## To Run the Development Backend Server

In order to be able to provide realistic examples, we will need in our playground a small REST API backend server. We can start the sample application backend with the following command:

    npm run server

This is a small Node REST API server. For example, you can find all courses in JSON format at http://localhost:9000/api/courses. All lessons are under the endpoint /api/lessons.

## To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)
