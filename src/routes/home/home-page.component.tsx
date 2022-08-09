import CategoryDirectory from "../../components/category-directory/category-directory.component";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <CategoryDirectory />
      <Outlet />
    </div>
  );
};

export default HomePage;
