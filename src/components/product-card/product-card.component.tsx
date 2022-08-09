import "./product-card.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CategoryItem } from "../../store/category/category.types";

type ProductProps = {
  product: CategoryItem;
};

const ProductCard = ({ product }: ProductProps) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price } = product;
  // const { addItemToCart } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </CustomButton>
    </div>
  );
};

export default ProductCard;
