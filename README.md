# Manga Reader React App

This application retrieves data from the [mangaeden.com][mangaeden] API.

## Running locally

1. Run `npm install` in the `services` folder.
2. Follow the instructions in `services/README.md` to start a docker container that uses a mongodb image.
3. `cd services`
4. Copy `services/.env.example` to `services/.env` and set preferred environment variables
5. `npm run start:cron`
   This will seed the database with a `mangas` collection and a `mangainfos` collection
6. Run `npm run watch` in the services folder
7. Visit `localhost:3001/graphql` in your browser to experiment with the GraphQL queries and mutations
8. More to come. (Frontend 😅)

## Purpose

No purpose, just following along with [this video series](https://youtu.be/7pWdNQS7ork 'Better Coding Academy on YouTube')

[mangaeden]: https://mangaeden.com/api

## License

UNLICENSED
