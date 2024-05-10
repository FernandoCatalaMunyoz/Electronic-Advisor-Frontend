import { Routes, Route, Navigate } from "react-router-dom";

import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { Users } from "../Users/Users";
import { Artists } from "../Artists/Artists";
import { Events } from "../Events/Events";
import { Clubs } from "../Clubs/Clubs";
import { EventDetail } from "../EventDetail/EventDetail";
import { UserClubs } from "../UserClubs/UserClubs";
import { EventsHome } from "../EventsHome/EventsHome";

export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={"/"} replace />} />
      <Route path="/events" element={<EventsHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/superAdmin/users" element={<Users />} />
      <Route path="/superAdmin/artists" element={<Artists />} />
      <Route path="/superAdmin/events" element={<Events />} />
      <Route path="/superAdmin/clubs" element={<Clubs />} />
      <Route path="/event-detail" element={<EventDetail />} />
      <Route path="/clubs" element={<UserClubs />} />
    </Routes>
  );
};
