import React, { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoadingBar } from 'react-redux-loading-bar'
import { Navigation, Login, Logout, Reset, Signup, Welcome, Home, Dashboard, Simulator, Statistics, User, Footer, LandingPage } from './components'
//import { PrivateRoute } from './components/routing'
import './styles/App.css'


function App() {

  return (
    <div className="App">
      <Fragment>
        <LoadingBar />
          <Navigation />
          <main>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/simulator" element={<Simulator />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/user/:userid" element={<User />} />
                <Route path="/login" element={<Login title="Login" />} />
                <Route path="/logout" element={<Logout title="Logout" />} />
                <Route path="/reset" element={<Reset title="Password Reset" />} />
                <Route path="/signup" element={<Signup title="Sign Up"/>} />
                <Route path="/welcome" element={<Welcome title="Welcome"/>} />
              </Routes>
          </main>
          <Footer />
      </Fragment>
    </div>
  );
}

export default App              