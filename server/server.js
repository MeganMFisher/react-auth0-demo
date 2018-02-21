const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      config = require('./config.js')
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      cors = require('cors'),
      request = require('request'),
      controller = require('./controller.js');

const app = express();

app.use(bodyParser.json());
app.use(session({
  resave: true,
  saveUninitialized: true, 
  secret: config.secret
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('../app/src'));
app.use(cors())

massive(config.database).then(db => {
  app.set('db', db)
}).catch((err) => {
  console.log(err)
})


/////////////
// DATABASE //
/////////////

passport.use(new Auth0Strategy({
    domain: config.auth0.domain,
    clientID: config.auth0.clientID,
    clientSecret: config.auth0.clientSecret,
    callbackURL: '/auth/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    var db = app.get('db')
    //Find user in database
    db.getUserByAuthId(profile.id).then(function (user) {
      user = user[0];
      if (!user) { //if there isn't one, we'll create one!
        console.log('CREATING USER');
        db.createUserByAuth([profile.displayName, profile.id]).then(function (user) {
          console.log('USER CREATED', user);
          return done(null, user[0]); // GOES TO SERIALIZE USER
        })
      } else { //when we find the user, return it
        console.log('FOUND USER', user);
        return done(null, user);
      }
    })
  }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function (userA, done) {
  console.log('serializing', userA);
  var userB = userA;
  //Things you might do here :
  //Serialize just the id, get other information to add to session, 
  done(null, userB); //PUTS 'USER' ON THE SESSION
});

// USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT

passport.deserializeUser(function (userB, done) {
  var userC = userB;
  app.get('db').getUserAndFavs(userC.authid).then(function (favorites){
    userC.favorites = favorites;
  done(null, userC);
//move done() inside of promise .then or else it will fire before it gets a response
  })
});




app.get('/auth', passport.authenticate('auth0'));


app.get('/auth/callback',
  passport.authenticate('auth0', {
    successRedirect: 'http://localhost:4000' //frontend port
  }),
  function (req, res) {
    
    res.status(200).send(req.user);
    console.log(req.user)
  })

app.get('/auth/me', function (req, res) {
  if (!req.user) return res.sendStatus(404);
  //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
  res.status(200).send(req.user);
})

app.get('/auth/logout', function (req, res) {
  req.logout();
  res.redirect('http://localhost:4000');
})


app.post('/postFav', controller.postFav)
app.delete('/deleteFav/:notFav', controller.deleteFav)
app.get('/getOptions', controller.getOptions)

 app.listen(process.env.PORT || config.port, function() {
    console.log('listening on port', this.address().port);
  });
