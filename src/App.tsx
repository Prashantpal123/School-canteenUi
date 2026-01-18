import { BrowserRouter } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext.js";

import { OrderProvider } from "./context/OrderContext.js";
import AppRoute from "./routes/AppRoute.js";

function App() {
  return (
   
      <StudentProvider>
        <OrderProvider>
          <BrowserRouter>
            <AppRoute />
          </BrowserRouter>
        </OrderProvider>
      </StudentProvider>
    
  );
}

export default App;
