import React from "react";
import { store } from "./lib/store";
import { Provider } from "react-redux";
import UserProfile from "./Components/UserProfile";
import UserProfileList from "./Components/UserProfileList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<UserProfileList />} />
          <Route path="/user-profile-list" element={<UserProfileList />} />
          <Route path="/user-profile-form" element={<UserProfile />} />
          <Route path="/user-profile-form/:userId" element={<UserProfile />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
