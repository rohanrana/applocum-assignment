import React, { Component } from "react";
import { Row,  message } from "antd";

import { withRouter } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";
import CartItemList from "../../components/CartItemsList/CartItemList";

let intialCart = JSON.parse(localStorage.getItem("al-cart"));
class Peoples extends Component {
  state = {
    cartItems: intialCart ? intialCart : [],
    products: [
      {
        Name: "Cheese",
        price: 2.5,
        Location: "Refrigerated foods",
        qty: 2,
        _id: 1,
      },
      {
        Name: "Crisps",
        price: 3,
        Location: "the Snack isle",
        qty: 5,
        _id: 2,
      },
      {
        Name: "pizza",
        price: 4,
        Location: "Refrigerated foods",
        qty: 7,
        _id: 3,
      },
      {
        Name: "Chocolate",
        price: 1.5,
        Location: "the Snack isle",
        qty: 8,
        _id: 4,
      },
      {
        Name: "Self-raising flour",
        price: 1.5,
        Location: "Home baking",
        qty: 0,
        _id: 5,
      },
      {
        Name: "Ground almonds",
        price: 3,
        Location: "Home baking",
        qty: 1,
        _id: 6,
      },
    ],
  };

  IncreaseQty = (_id) => {
    this.setState((state) => {
      let cartItems1 = state.cartItems;
      let tobeUpdateItem = cartItems1.find((d) => d._id === _id);
      tobeUpdateItem.qty++;
      localStorage.setItem("al-cart", JSON.stringify(cartItems1));

      return { cartItems: cartItems1 };
    });
  };

  DecreaseQty = (_id) => {
    this.setState((state) => {
      let cartItems1 = state.cartItems;
      let tobeUpdateItem = cartItems1.find((d) => d._id === _id);
      tobeUpdateItem.qty--;
      localStorage.setItem("al-cart", JSON.stringify(cartItems1));

      return { cartItems: cartItems1 };
    });
  };
  OnAddToCart = (cartItem) => {
    let { cartItems } = this.state;
    let item_id = cartItems.find((d) => d._id === cartItem._id);
    if (item_id) {
      this.setState(
        (state) => {
          let cartItems1 = state.cartItems;
          let tobeUpdateItem = cartItems1.find((d) => d._id === cartItem._id);
          tobeUpdateItem.qty++;
          localStorage.setItem("al-cart", JSON.stringify(cartItems1));

          return { cartItems: cartItems1 };
        },
        () => {
          message.success(`${cartItem.Name} Qty Updated`);
        }
      );
    } else {
      this.setState(
        (state) => {
          let cartItems = state.cartItems;
          cartItems.push(cartItem);
          localStorage.setItem("al-cart", JSON.stringify(cartItems));

          return { cartItems };
        },
        () => {
          message.success(` ${cartItem.Name} added in cart`);
        }
      );
    }
  };
  onRemoveCartItem = (_id) => {
    this.setState((state) => {
      let cartItems = state.cartItems.filter((d) => d._id !== _id);
      localStorage.setItem("al-cart", JSON.stringify(cartItems));
      return { cartItems };
    });
  };

  render() {
    let { cartItems, products } = this.state;

    return (
      <div className="site-card-border-less-wrapper">
        <Row>
          <Row>
            <ProductList products={products} OnAddToCart={this.OnAddToCart} />
            <CartItemList
              cartItems={cartItems}
              DecreaseQty={this.DecreaseQty}
              IncreaseQty={this.IncreaseQty}
              onRemoveCartItem={this.onRemoveCartItem}
            />
          </Row>
        </Row>
      </div>
    );
  }
}

export default withRouter(Peoples);
