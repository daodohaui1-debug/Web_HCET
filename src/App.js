import "./App.css";
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import DefaultLayout from "./Layouts/DefaultLayout";
import ScrollToTop from "./ScrollToTop";
// import { getCookie } from "./Cookie";
// import Authen from "./pages/authen/Authen";
// import NotFound from "./pages/NotFound/NotFound";
// import { DataProvider } from "./DataContext";

// const token = getCookie("token");

function App() {
  // function TestPlayer() {

  return (
    <>
      {" "}
      <Router>
        <div className="App">
          <ScrollToTop />
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.Component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
            {/* <Route path="*" element={<NotFound />} />, */}
          </Routes>
        </div>
      </Router>
    </>
  );
}
export default App;
