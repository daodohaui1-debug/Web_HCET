import Home from "../pages/Home/Home";
import MyCourses from "../pages/Mycources/Mycources";
import CoursePage from "../pages/CoursePage/CoursePage";
import Content from "../pages/Content/Content";
import Admin from "../pages/Admin/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const publicRoutes = [
  { path: "/", Component: Home },
  { path: "/courses", Component: MyCourses },
  { path: "/course/:id", Component: CoursePage },
  { path: "/content/:id", Component: Content },
  { path: "/admin", Component: Admin },
  // <Route path="*" element={<NotFound />} />,
];

export { publicRoutes };
