Wiki Maps
=========

Wiki maps is a web app created by [David Radvan](https://github.com/DavidRadvan), [Ted Pampilon](https://github.com/tpampilon) and [Dennis Wong](https://github.com/denniswong0106) for their Lighthouse Labs midterm project that allows users to collaboratively create maps using **Google Maps API** which list multiple "points". For example: "Best Places to Eat Around Town" or "Locations of Movie Scenes".

## Goals

The following are the goals that was set to be achieved by this project.

1. Build a web app from start to finish using the tech and approaches learned to date.
2. Practice architecting an app in terms of UI/UX, Routes/API and Database.
3. Manage a multi-developer project with git.
4. Simulate the working world where you do not always get to completely cherry pick your team, stack or product features.
5. Practice demoing an app to help prepare for the final project and employer interviews.

## ScreenShots

![home-page.png](https://github.com/DavidRadvan/Wiki_Maps/blob/routes/public/images/home-page.png?raw=true)
![home-page-dark-mode.png](https://github.com/DavidRadvan/Wiki_Maps/blob/routes/public/images/home-page-dark-mode.png?raw=true)
![map-page.png](https://github.com/DavidRadvan/Wiki_Maps/blob/master/public/images/map-page.png?raw=true)
![profile-page.png](https://github.com/DavidRadvan/Wiki_Maps/blob/routes/public/images/profile-page.png?raw=true)

## Getting Started

The app is hosted at Heroku, you can simply [click here](https://wikimaps.herokuapp.com/).

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Body-Parser
- Chalk
- Cookie-Session
- Dotenv
- EJS
- Express
- Faker
- Knex
- Moment
- Morgan
- Node-SASS-Middleware

## DevDependencies

- Nodemon

## Roles

- [David Radvan](https://github.com/DavidRadvan)  - **Front-End**
- [Ted Pampilon](https://github.com/tpampilon) - **Routes/Express**
- [Dennis Wong](https://github.com/denniswong0106) - **SQL/Database**

<!-- ## HOW TO GRANT PSQL ACCESS TO USER "labber"

-$ psql midterm -U labber
-$ enter password given in .env file
(inside psql)
-$ \i ./db/schema/00_addAllData.sql

-- In your console (outside psql):
-$ npx knex seed:run --env development -- This generates seed data, runs all the seed files within seed folder
-- If successful, console should say 'ran <x> seed files' -->
