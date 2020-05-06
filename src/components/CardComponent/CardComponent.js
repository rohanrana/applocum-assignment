import React from "react";
import { Card, Col, Button, Tag } from "antd";


const { Meta } = Card;
// import { Link } from "react-router-dom";
export default function CardComponent(props) {
  return (
    <Col style={{ marginTop: 10, cursor: "pointer" }} span={12}>
      <Card
        title={props.product.Name}
        bordered={false}
        actions={[
          <Button
            disabled={props.product.qty === 0}
            onClick={() => props.OnAddToCart(props.product)}
          >
            Add To Cart
          </Button>,
        ]}
        style={{ width: 300 }}
        extra={props.product.qty === 0 && <Tag color="red"> Sold Out </Tag>}
      >
        <Meta
          style={{ marginTop: 10 }}
          title="Price"
          description={`$${props.product.price}`}
        />
        <Meta
          style={{ marginTop: 10 }}
          title="Location"
          description={`${props.product.Location}`}
        />
      </Card>
    </Col>
  );
}
