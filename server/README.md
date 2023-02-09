# Getting Started with the Market Transparency Unit for Fuels API

## Background

This project is based on the free database of German fuel price comparisons ([Market Transparency Unit for Fuels](https://www.bundeskartellamt.de/EN/Economicsectors/MineralOil/MTU-Fuels/mtufuels_node.html;jsessionid=EA811A904ED187307C9BEFA50CCA8F8D.2_cid371)).

In order to get live data you need to be officially licensed by the "Bundeskartellamt". This is of course out of question for a proof of concept. There is no way they will grant a license to a Github project. They only provide live data to real service providers, which means you actually need to have an app and a website.

Alternatively some of the licensed providers have put the "dumped" data on the internet, which is available for e.g. proof of concept projects. The full dump is around 50GB compressed and ca. 150GB uncompressed. With a high performance server with 288GB of RAM I carved out a slice, representing Berlin for the first week of 2022.

By the means of [sed](https://en.wikipedia.org/wiki/Sed) the data was rearranged. The timestamp was converted from an absolute timestamp to a relative timestamp, which means you can start from an arbitratry date and experience the first week 2022 in Berlin.

The full simulation runs about 7 days. You heard correctly, the server needs to be running for 7 days for the full experience.

There are NodeJS cronjobs running, which will snapshot the data every minute and provide hourly, daily, weekly and monthly analytics for the high, average and low of e5, e10 and diesel fuels.

In addition you have a frontend which is placed in the client folder. There you have the option to experience the UI for users (registered or unregistered) and for admins (with really sophisticated analytics).

Sample data for the fuel stations, the fuel prices and for an admin account is already inclueded in the migrations. Please look up the values for the admin in the => migrations => sqls => users_up file.

## How to get the API running

### Environment (.env) & Docker

The first step is to adjust the `.env` file with all the environment variables.  
Attached is a sample environment file (`.env-sample`):

* BCRYPT_SALT=project
* SALT_ROUNDS=10
* EXPRESS_PORT=3080
* SESSION_SECRET=project
* CORS_DOMAIN=http://localhost:3080
* GMAIL_USER= e.g. test@test.com
* GMAIL_PASS= not your regular password, you need an app password
* GMAIL_SENDER=`"The Evil Ghost 👻" <test@test.com>`
* GOOGLE_API= API Key (Geolocation and MAPS Static)
* DB_EXTENSION=cube,earthdistance
* DB_HOST=127.0.0.1
* DB_PORT=5432
* DB_NAME=myproject
* DB_USER=myproject
* DB_PASS=myproject
* PGADMIN_DEFAULT_EMAIL=user@project.com
* PGADMIN_DEFAULT_PASSWORD=pgadmin
* TZ=Europe/Berlin

This usually does fit and if it fits for you, you just need to rename it to .env.

Please make sure, that the timezone (TZ) is your timezone, otherwise it will not work well.

Also you need to have a working [docker](https://en.wikipedia.org/wiki/Docker_(software)) environment.

Then you can start Docker with: `docker-compose -f docker-compose.yml up`

### Yarn

#### Installation:	`yarn install`

This will install the necessary NodeJS modules.

#### Migrations: `yarn db-migrate up`

This will initialize the Docker instance of the PostgreSQL database. Alternatively you can reverse this with `yarn db-migrate down 10`.

#### Starting (dev mode): `yarn dev`

Runs the app in the development mode.
Open [http://localhost:3080](http://localhost:3080) to view it in your browser

3080 is the port, unless you did change it in the `.env` file.

Since this is an API you will just see the default greeting in the browser. For full functionality you will need a professional API client like [Postman](https://www.postman.com/).

#### Starting (regular mode): `yarn start`

This has less feedback and does not update on code changes like in the dev mode, otherwise it is the same.

#### Prettifying: `yarn prettier`

Applies the prettier patterns to the code to make it look better.

#### Linting: `yarn lint`

Code linting, that means obvious errors are spotted in advance.

#### Testing: `yarn test`

Builds the app and afterward runs the tests. The tests are run with [Jest](https://jestjs.io/).

#### Building: `yarn build`

Builds the app for production to the `build` folder. The build is minified and the filenames include the hashes.

Your app is now ready to be deployed!

## The API

### Foreword

You need to let the API run continously for up to 7 days (max. runtime).

### Routes

The API has 4 main routes:

* Info

* User
 
* Dashboard (admin only)
 
* Statistics (admin only)

### Security Update 2.0

JWT-tokens have been replaced by a server session based cookies.
It is just better.

Access is basically defined by the middleware.

	=> (nothing)		Guest Access
	=> (verifyUser)		User Access
	=> (verifyAdmin)	Admin Access

For a professional application a more granualar access would be desired.

### Info

	=> app.get('/api/info/:id', handler.price)
	=> app.post('/api/info', handler.stations)
	=> app.post('/api/info/stations', handler.stations)

Price is the current snapshot (the actual prices) for e5, e10 and diesel for the station (:id - which is the uuid of the station). 
	
Stations will give you the next 10 adjacent stations to the current lat and lng coordinates.  
More details you will find in the section geolocation.

#### Geolocation

It is not trivial to [calculate the distance between two coordinates on the earth](https://www.movable-type.co.uk/scripts/latlong.html).

So in order to caculate the distance correctly you would e.g. the [geolib](https://github.com/manuelbieh/geolib) from NodeJS.

An alternative is to use PostgreSQL with the cube and earthdistance extensions.

So here we are using the earthdistance extension to calculate the distance between coordinates.

The result is truely amazing! It was verified with "G Maps" and it is exactly the same.

PostgreSQL has some really nice extensions and it is impressive what this database is capable of!

### User

	=> app.get('/api/users', verifyAdmin, handler.index)
	=> app.get('/api/users/:id', verifyUser, handler.show)
	=> app.post('/api/users', handler.create)
	=> app.put('/api/users', verifyUser, handler.update)
	=> app.delete('/api/users', verifyUser, handler.destroy)
	=> app.post('/api/users/stats', verifyAdmin, handler.stats)
	=> app.post('/api/users/summary', verifyAdmin, handler.summary)
	=> app.get('/api/users/confirm/:secret', handler.confirm)
	=> app.post('/api/users/login', handler.login)
	=> app.post('/api/users/logout', verifyUser, handler.logout)
	=> app.get('/api/users/reset/:username', handler.reset)
	=> app.get('/api/users/verify/:secret', handler.verify)
	
First for some of the user routes you will need a token, this means you have to login first (see last route).

The index of all users (first route) can only be called by admins.

Users can create, update, show and delete their accounts.

### Preferences
#### Update (functionality was includes in the User complex and was replaced by the security section)

In addition users (and of course admins - they are users and admins) can save and update their preferences.

	=> app.get('/api/prefs/:id', verifyAuthToken, handler.show)
	=> app.post('/api/prefs', verifyAuthToken, handler.clear)
	=> app.put('/api/prefs', verifyAuthToken, handler.update)

The preferences are usefull for displaying additional information.

### Secure Information

The place where the secure user details are stored. Access by admins only

	=> app.get('/api/secure/:id', verifyUser, handler.show)
	=> app.put('/api/secure', verifyAdmin, handler.update)

### Statistics

Only the basic statistics are open for users (the highs, averages and lows for the last hour). 

For all the other statistics you need to be admin and admins can analyse them in their admin section of the frontend.

	=> app.get('/api/stats/hourly', handler.hourly)
	=> app.get('/api/stats/admin/hourly', verifyAdmin, handler.adm_hourly)
	=> app.get('/api/stats/admin/daily', verifyAdmin, handler.adm_daily)
	=> app.get('/api/stats/admin/weekly', verifyAdmin, handler.adm_weekly)
	=> app.get('/api/stats/admin/monthly', verifyAdmin, handler.adm_monthly)
	
## pgAdmin 4

There is a pgAdmin as a webservice included.

### Access the pgAdmin 4 webservice

The default port is [8080](http://localhost:8080) and the login / pass are `user@project.com` / `pgadmin`.

These values can be changed in the `.env` file. The port can only be changed in the `docker-compose.yml`.

	
**Now please have fun with the simulation!**