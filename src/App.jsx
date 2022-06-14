import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Navigate,
  Routes,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "./App.css";

const HomePage = React.lazy(() => import("./components/HomePage"));
const StudentsPage = React.lazy(() => import("./components/StudentsPage"));
const RQStudentsPage = React.lazy(() => import("./components/RQStudentsPage"));
const CoursesPage =  React.lazy(() => import("./components/CoursesPage"));
const NotFoundPage = React.lazy(() => import("./components/404Page"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/home-page"> Home Page </Link>
                </li>
                <li>
                  <Link to="/students-page"> Students Page </Link>
                </li>
                <li>
                  <Link to="/rq-students-page"> RQ Students Page </Link>
                </li>
                <li>
                  <Link to="/courses-page"> Courses Page </Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route exact path="/home-page" element={<HomePage />} />
              <Route path="/students-page" element={<StudentsPage />} />
              <Route path="/rq-students-page" element={<RQStudentsPage />} /> 
              <Route path="/courses-page" element={<CoursesPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/" element={<Navigate to="/home-page" />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
