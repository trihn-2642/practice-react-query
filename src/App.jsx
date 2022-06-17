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
const RQStudentsDetailPage = React.lazy(() =>
  import("./components/RQStudentDetailPage")
);
const CoursesPage = React.lazy(() => import("./components/CoursesPage"));
const ParallelQueriesPage = React.lazy(() =>
  import("./components/ParallelQueriesPage")
);
const DynamicParallelQueriesPage = React.lazy(() =>
  import("./components/DynamicParallelQueriesPage")
);
const DependentQueriesPage = React.lazy(() =>
  import("./components/DependentQueriesPage")
);
const PaginatedQueriesPage = React.lazy(() =>
  import("./components/PaginatedQueriesPage")
);
const InfiniteQueriesPage = React.lazy(() =>
  import("./components/InfiniteQueriesPage")
);
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
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/students">Students</Link>
                </li>
                <li>
                  <Link to="/rq-students">RQ Students</Link>
                </li>
                <li>
                  <Link to="/courses">Courses</Link>
                </li>
                <li>
                  <Link to="/parallel">Parallel Queries</Link>
                </li>
                <li>
                  <Link to="/dynamic-parallel">Dynamic Parallel Queries</Link>
                </li>
                <li>
                  <Link to="/dependent">Dependent Queries</Link>
                </li>
                <li>
                  <Link to="/paginated">Paginated / Lagged Queries</Link>
                </li>
                <li>
                  <Link to="/infinite">Infinite Queries</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route exact path="/home" element={<HomePage />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/rq-students" element={<RQStudentsPage />} />
              <Route
                path="/rq-students/:studentId"
                element={<RQStudentsDetailPage />}
              />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/parallel" element={<ParallelQueriesPage />} />
              <Route
                path="/dynamic-parallel"
                element={<DynamicParallelQueriesPage />}
              />
              <Route path="/dependent" element={<DependentQueriesPage />} />
              <Route path="/paginated" element={<PaginatedQueriesPage />} />
              <Route path="/infinite" element={<InfiniteQueriesPage />} />
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
