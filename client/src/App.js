import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import HomePage from './Pages/Home';
import FacilityLogin from './Pages/FacilityLogin';
import FacilitySignup from './Pages/FacilitySignup';
import UserLogin from './Pages/UserLogin';
import About from './Pages/About';
import UserSignup from './Pages/UserSignup';
import Education from './Pages/Education';
import Userdashboard from './Pages/Userdashboard';
import Facilitydashboard from './Pages/Facilitydashboard';
import AllRequests from './Pages/AllRequests';
import RequestFacility from './Pages/RequestFacility';


function App() {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/facility/login" element={<FacilityLogin/>} />
          <Route path="/facility/Signup" element={<FacilitySignup/>} />
          <Route path="/User/login" element={<UserLogin/>} />
          <Route path="/User/signup" element={<UserSignup/>} />
          <Route path="/about" element={<About />}/>
          <Route path="/education" element={<Education />}/>
          <Route path="/User/:UserID" element={<Userdashboard/>}/>
          <Route path="/facility/:FacilityID" element={<Facilitydashboard />}/>
          <Route path="/allrequests/:FacilityID" element={<AllRequests />}/>
          <Route path="/User/facility/:Facility_ID/:UserID" element={<RequestFacility/>} />
        </Routes>
      </div>
    </Router>
  </Provider>
  );
}

export default App;
