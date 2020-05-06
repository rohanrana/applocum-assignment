import React from "react";
import { Col, Row } from "antd";
import CardComponent from "../CardComponent/CardComponent";

export default function ProductList(props) {
  let { products } = props;
  return (
    <Col span={12}>
      <h1>Products</h1>
      <Row>
        {products.map((product, index) => {
          return (
            <CardComponent
              key={products._id}
              OnAddToCart={props.OnAddToCart}
              product={product}
            >
              <div className="card-inner">
                <h1>{product.Name}</h1>
              </div>
            </CardComponent>
          );
        })}
      </Row>
    </Col>
  );
}
