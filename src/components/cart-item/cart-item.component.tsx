import "./cart-item.styles.scss";
import { CartItem as CartItemtype } from "../../store/cart/cart.types";
import { memo } from "react";

type CartItemProps = {
  cartItem: CartItemtype;
};

const CartItem = memo(({ cartItem }: CartItemProps) => {
  const { name, quantity, price, imageUrl } = cartItem;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
});

export default CartItem;
