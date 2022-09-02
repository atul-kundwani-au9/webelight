import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "./components/navbar";
import productData from "./products.json";
import "./App.css";

class App extends Component {
  state = {
    total: "",
  };
  componentDidMount() {
    const total = this.totalCartPriceHandler();
    this.setState({
      total,
    });
  }

  render() {
    console.log(this.props.product);
    const { cart } = this.props.product;
    return (
      <div className="home container">
        <Navbar />
        <div className="product-container row">
          <div className="col-9">
            <h1>Products</h1>
            <div className="products ">
              {productData.map((data) =>
                this.displayProducts(data, this.addToCartHandler, cart)
              )}
            </div>
          </div>
          <div className="col-3">
            <h1>Cart</h1>
            <div className="cart ">
              {cart.map((product) =>
                this.displayCart(
                  product,
                  this.removeProductFromCart,
                  this.productQuantityHanlder
                )
              )}
              <div className="total-price">
                <span className="total">Total</span>
                <span className="price">Rs.{this.state.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  totalCartPriceHandler = () => {
    const { cart } = this.props.product;
    let total = 0;
    cart.forEach((product) => {
      total = total + parseInt(product.price) * product.quantity;
    });
    return total;
  };

  addToCartHandler = (product) => {
    const { cart } = this.props.product;
    cart.push({ ...product, quantity: 1 });
    this.props.dispatch({ type: "ADD_TO_CART", cart });
    const total = this.totalCartPriceHandler();
    this.setState({
      total,
    });
  };
  removeProductFromCart = (product) => {
    const { cart } = this.props.product;
    const index = cart.findIndex((prod) => product.id === prod.id);
    cart.splice(index, 1);
    this.props.dispatch({ type: "ADD_TO_CART", cart });
    const total = this.totalCartPriceHandler();
    this.setState({
      total,
    });
  };

  productQuantityHanlder = (e, product) => {
    const { cart } = this.props.product;
    const index = cart.findIndex((prod) => product.id === prod.id);
    const value = parseInt(e.target.value);
    if (value > 0) {
      cart[index].quantity = value;
      this.props.dispatch({ type: "ADD_TO_CART", cart });
      const total = this.totalCartPriceHandler();
      this.setState({
        total,
      });
    }
  };

  displayProducts = (product, onClickHandler, cart) => {
    let added = false;
    cart.forEach((prod) => {
      if (prod.id === product.id) {
        added = true;
      }
    });
    return (
      <div key={product.id} className="product">
        <p className="product-category">{product.category}</p>
        <p className="product-name">{product.name}</p>
        <img className="product-image" src={product.image} alt={product.name} />
        <button
          className="add-to-cart"
          onClick={() => (!added ? onClickHandler(product) : null)}
        >
          {added ? "Added" : "Add to cart"}
        </button>
        <p className="product-price">Rs.{product.price}</p>
      </div>
    );
  };

  displayCart = (product, removeProductFromCart, productQuantityHanlder) => {
    return (
      <div key={product.id} className="cart-product">
        <div className="left">
          <img className="image" src={product.image} alt={product.name} />
        </div>
        <div className="right">
          <p className="name">{product.name}</p>
          <p className="Availablity">
            Availablity: <span>In stock</span>
          </p>
          <div className="myflex">
            <p className="product-price">
              Rs.{parseInt(product.price) * product.quantity}
            </p>
            <input
              type="number"
              className="quantity"
              value={product.quantity}
              onChange={(e) => productQuantityHanlder(e, product)}
            />
          </div>

          <button
            className="remove-from-cart"
            onClick={() => removeProductFromCart(product)}
          >
            X
          </button>
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
