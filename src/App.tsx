import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import SingleEmployee from "./pages/EmployeePages/SingleEmployee";
import Employees from "./pages/EmployeePages/Employees";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import AddEmployee from "./pages/EmployeePages/AddEmployee";
import Leaves from "./pages/LeavePages/Leaves";
import DocRequests from "./pages/DocumentPages/DocRequests";
import PrivateRoute from "./components/PrivateRoute";
import ComingSoon from "./pages/OtherPage/ComingSoon";
import SendAnnouncement from "./pages/Announcements/SendAnnouncement";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout with Auth */}
          <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
            <Route index path="/" element={<Home />} />

            {/* Employees */}
            <Route path="/employees" element={<Employees />} />
            <Route path="/employee/new" element={<AddEmployee />} />
            <Route path="/employee/:id" element={<SingleEmployee />} />

            {/* Leaves */}
            <Route path="/leaves" element={<Leaves />} />

            {/* Document Requests */}
            <Route path="/docs/requests" element={<DocRequests />} />
            <Route path="/docs/templates" element={<ComingSoon />} />

            {/* reports */}
            <Route path="/reports/leaves" element={<ComingSoon />} />
            <Route path="/reports/documents" element={<ComingSoon />} />

            {/* settings */}
            <Route path="/settings" element={<ComingSoon />} />

            {/* announcements */}
            <Route path="/announcements" element={<SendAnnouncement />} />

          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
