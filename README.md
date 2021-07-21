!["Screenshot of URLs page"](https://github.com/msarauer/better-place/blob/master/docs/better-place.png?raw=true)

# Description

This project was created and presented as our teams' final project for Lighthouse Lab's Web Development Course in July 2021. The application allows users to seek out 
volunteers to help them with everyday tasks, as well as find others who may need help. The aim is to help make the world a Better Place.

## Features

The following features have been implemented in our application as of July 17, 2021:

- Login and create a profile
- Post your opportunity for others to volunteer
- Volunteer for someone else's opportunity
- Display all nearby needs in a list
- Display all nearby needs on a map
- Filter by: Category, Time Commitment, Distance, and Search word
- Sort by distance, time commitment, and user rating
- Leave a review and rating for a user
- Chat with other users

## Tech Stack

- Front End: React
- Component Libraries: Material UI, Ant Design
- Back End: Express, Node, Socket.io
- Database: PostgreSQL
- CSS Preprocessor: Sass
- APIs: Google Maps JavaScript API, Google Geocoding API

## Screenshots

### Profile/Login comes out from the side of the application, with a smooth transition.

!["Screenshot of URLs page"](https://github.com/msarauer/better-place/blob/master/docs/profile.png?raw=true)

### Dynamic list of volunteer opportunities that can be filtered and sorted by location, time commitment, distance, category and search term.

!["Screenshot of register page"](https://github.com/msarauer/better-place/blob/master/docs/list.png?raw=true)

### Switch to a map visual of all the data in the opportunity list with all the same filtering and sorting capabilities.

!["Screenshot of register page"](https://github.com/msarauer/better-place/blob/master/docs/map.png?raw=true)

### Create a new opportunity with a title, description, address, category, and time commitment that volunteers can then sign up for.

!["Screenshot of register page"](https://github.com/msarauer/better-place/blob/master/docs/new.png?raw=true)

## Setup

Install dependencies with 

```sh
yarn
```

## Start Server

From the server directory

```sh
yarn run go
```

## Start Client

From the client directory

```sh
yarn run start
```