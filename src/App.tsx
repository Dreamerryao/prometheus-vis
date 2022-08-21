import { BrowserRouter } from "react-router-dom";
import Routers from "./components/Routers";
import { WebsiteProvider } from "./contexts/WebsiteProvider";
const App = () => {
  return (
    <WebsiteProvider>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </WebsiteProvider>
  );
};

export default App;
