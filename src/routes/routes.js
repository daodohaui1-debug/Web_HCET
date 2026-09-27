import Home from "../pages/Home/Home";
import MyCourses from "../pages/Mycources/Mycources";
import CoursePage from "../pages/CoursePage/CoursePage";
import Content from "../pages/Content/Content";
import Admin from "../pages/Admin/Admin";
import Components from "../pages/Components/Components";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const publicRoutes = [
  { path: "/", Component: Home },
  { path: "/courses", Component: MyCourses },
  { path: "/course/:id", Component: CoursePage },
  { path: "/content/:id", Component: Content },
  { path: "/admin", Component: Admin },
  { path: "/components", Component: Components },
  { path: "/components/:id", Component: Components },
  // <Route path="*" element={<NotFound />} />,
];

export { publicRoutes };
