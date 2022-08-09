import "./category-item.styles.scss";
import { Link } from "react-router-dom";

type CategoryItemProps = {
  category: { title: string; imageUrl: string; route: string };
};

const CategoryItem = ({ category }: CategoryItemProps) => {
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
