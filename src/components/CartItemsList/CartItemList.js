import React from "react";
import { Col, List, InputNumber } from "antd";
import {
  PlusCircleFilled,
  MinusCircleFilled,
  DeleteFilled,
} from "@ant-design/icons";

export default function CartItemList(props) {
  let { cartItems } = props;

  return (
    <Col span={12}>
      <h1>Cart</h1>

      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        // bordered
        style={{padding:10}}
        renderItem={(item) => (
          <List.Item
            style={{ borderBottom: `1px solid  #80808045` }}
            actions={[
              <DeleteFilled
                title="Remove Item"
                style={{ fontSize: "16px", color: "#e81616" }}
                onClick={() => props.onRemoveCartItem(item._id)}
              />,
              <div style={{marginTop:-3}}  >
                <MinusCircleFilled
                  onClick={() => {
                    if (item.qty > 1) {
                      props.DecreaseQty(item._id);
                    }
                  }}
                  title="Add Qty"
                  style={{ marginRight: 5 }}
                />
                <InputNumber
                  disabled

                  style={{ width: 40 }}
                  min={0}
                  max={item.qty}
                  value={item.qty}
                />
                <PlusCircleFilled
                  title="Remove Qty"
                  onClick={() => props.IncreaseQty(item._id)}
                  style={{ marginLeft: 5 }}
                />
              </div>,
            ]}
          >
            <List.Item.Meta
              // avatar={
              //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              // }
              title={item.Name}
              description={`$${item.price}`}
            />
            {item.Location}
          </List.Item>
        )}
      />
    </Col>
  );
}
