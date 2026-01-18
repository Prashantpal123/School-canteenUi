import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Home from "../Pages/Home.js";
import Snacks from "../Pages/Snacks.js";
import BulkOrder from "../Pages/BulkOrder.js";
import Students from "../Pages/Students.js";
import StudentDetail from "../Pages/StudentDetail.js";

const AppRoute = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/snacks" element={<Snacks />} />
          <Route path="/bulk-order" element={<BulkOrder />} />
          <Route path="/students" element={<Students />} />
          <Route path="/student/:studentId" element={<StudentDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppRoute;
