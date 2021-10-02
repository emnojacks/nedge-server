# NEDGE: an app for the common climber 🧗‍♂️

> Nudging users closer to the edge of their climbing ability by catalyzing healthier mental pathways and physical conditions.

## About 

As climbers, we’ve all experienced the plateau. Most of us reach it
before we are internally satisfied with our performance. While in
the **dreaded plateau**, we either give up our conscious or unconscious
goals, carry on for years wondering why we never advance, or give up climbing entirely out of growing resentment.

Nedge is an application for rock climbers of all skill levels and experience that allows users to observe and become aware of their climbing patterns and the habits that may directly affect their performance. We are climbers but first and foremost we are humans therefore respond to proven behavior change interventions at the core of this app.

### Languages & Frameworks

The entire project was written in JavaScript ES6 and built on [Node.js](https://nodejs.org) - an aysynchronous event-driven runtme framework for JavaScript. 

- This server was built using [PostgreSQL](https://www.postgresql.org) as a relational database management system.

- [PgAdmin4](https://www.pgadmin.org) was used on the local machine as db admin and development platform. 

- [Sequelize](https://sequelize.org) - a promise based Node.js ORM for Postgres and other SQL languages - was used as the ORM. 

- [Express](https://expressjs.com) - a Node.js web app framework - was used for API routing.

### Authentication

Route authentication is accomplished through jsonwebtoken and password encryption via bcrypt.  

There is simple role based access control for gym employees versus member climbers. This aspect will be fortified in future deployments.

### Routes & Models 

This db has four models, controllers, and associated tables: 
- Climber (user)
- Goals
- Sessions
- Gym (admin)

The Session and Goal tables are full CRUD. Full CRUD user and admin routes are still in production. Multiple routes are included but still in development for admin roles. There is no front end access to the admin routes that are still in production. 

#### Client Side 
##### included for reference 

The client side was created with [Create React App](https://github.com/facebook/create-react-app) template TypeScript. 

#### Lanuages: 
- JavaScript 
- Typescript
- HTML5 
- CSS3

#### Component and Styling Libraries: 
- bootstrap
- reactstrap

#### Routing:
- react-router-dom

## Running the App

If you want, you can clone this repo, make the project better, and share it! Copy the repo to your local IDE using:

### `git clone`

The package.json sets node app.js as the start script. To run the app in the development mode, in the project directory, you can run:

### `npm start`

Then open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. Then running:

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Deployed App

See NEDGE climbing app in it's Beta version [on heroku](https://nedge-crimbing.herokuapp.com/).

### Purpose

This project was created for [Eleven Fifty Academy's](https://elevenfifty.org/) Red Badge Web Development Bootcamp.  