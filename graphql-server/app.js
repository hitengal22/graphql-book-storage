const express = require('express');
const mongoose = require('mongoose');
const { createYoga } = require('graphql-yoga');
const axios = require('axios');
const { createHandler } = require('graphql-http/lib/use/express');
const cors = require('cors');
const schema = require('./schemas/schema');
const Film = require('./models/Film');
const People = require('./models/People');

const app = express();
const yoga = createYoga({ schema });
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/swapi')
  .then(async () => {
    // store films in db
    const films = await Film.find({});
    if (films.length === 0) {
      axios.get('https://swapi.dev/api/films/')
      .then((res) => {
        res.data?.results?.forEach((row) => {
          console.log("FILMS STORED!!");
          let film = new Film(row)
          return film.save();
        })
      });
    }

    // store people records in db
    const people = await People.find({});
    if (people.length === 0) {
      axios.get('https://swapi.dev/api/people')
        .then((res) => {
          res?.data?.results?.forEach((p) => {
            const people = new People(p);
            console.log("People Stored!!!");
            return people.save();
          });
        })
    }

    console.log('Connected!')
  });

app.use(yoga.graphqlEndpoint, yoga)

app.listen(4200, () => {
  console.log("App is listing in 4200 " + yoga.graphqlEndpoint);
})
