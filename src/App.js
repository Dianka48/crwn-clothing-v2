import HomePage from "./routes/home/home-page.component";
import { Routes, Route } from "react-router-dom";
import HomeNavigation from "./routes/navigation/home-navigation.component";
import AuthenticationForms from "./routes/authentication/authentication-forms.component";
import Shop from "./routes/shop/shop-component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<HomeNavigation />}>
        <Route index element={<HomePage />}></Route>
        <Route path="shop/*" element={<Shop />}></Route>
        <Route path="auth" element={<AuthenticationForms />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
