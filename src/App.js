import HomePage from "./routes/home/home-page.component";
import { Routes, Route } from "react-router-dom";
import HomeNavigation from "./routes/navigation/home-navigation.component";
import AuthenticationForms from "./routes/authentication/authentication-forms.component";

const Shop = () => {
  return <div>I am the shop page</div>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeNavigation />}>
        <Route index element={<HomePage />}></Route>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="auth" element={<AuthenticationForms />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
