import "./category-item.styles.scss";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  return (
    <div className="category-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <Link to={route} className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Link>
    </div>
  );
};

export default CategoryItem;
