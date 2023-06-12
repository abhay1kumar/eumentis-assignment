import React, { useState, useCallback } from "react";
import {
  EditOutlined,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import Popup from "./Popup";

const MemoizedCard = React.memo(Card);

const CardLayout = ({ data, setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupData, setPopupData] = useState();

  const handleHeartClick = useCallback(
    (cardId) => {
      setData((prevCards) =>
        prevCards.map((card) => {
          if (card.id === cardId) {
            return {
              ...card,
              isLiked: !card.isLiked,
            };
          }
          return card;
        })
      );
    },
    [setData]
  );

  const handleEditClick = useCallback((card) => {
    setIsModalOpen(true);
    setPopupData(card);
  }, []);

  const handleDeleteClick = useCallback(
    (cardId) => {
      setData((prevCards) => prevCards.filter((card) => card.id !== cardId));
    },
    [setData]
  );

  return (
    <>
      <Popup
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        popupData={popupData}
        setData={setData}
        data={data}
      />
      <Row gutter={[20, 16]} style={{ padding: "20px" }}>
        {data &&
          data.map((card) => (
            <Col key={card.id} xs={24} sm={24} md={8} lg={8} xl={6}>
              <MemoizedCard
                style={{ maxWidth: "100%", minWidth: "300px" }}
                cover={
                  <img
                    alt="example"
                    src={`https://avatars.dicebear.com/v2/avataaars/${card.username}.svg?options[mood][]=happy`}
                  />
                }
                actions={[
                  <Button
                    icon={
                      !card.isLiked ? (
                        <HeartOutlined
                          style={{
                            color: "red",
                            fontSize: "20px",
                          }}
                        />
                      ) : (
                        <HeartFilled
                          style={{
                            color: "red",
                            fontSize: "20px",
                          }}
                        />
                      )
                    }
                    style={{ border: "none" }}
                    onClick={() => handleHeartClick(card.id)}
                  />,
                  <Button
                    icon={
                      <EditOutlined
                        style={{ color: "#000000a6", fontSize: "20px" }}
                        onClick={() => handleEditClick(card)}
                      />
                    }
                    style={{ border: "none" }}
                  />,
                  <Button
                    icon={
                      <DeleteFilled
                        style={{ color: "#000000a6", fontSize: "20px" }}
                      />
                    }
                    style={{ border: "none" }}
                    onClick={() => handleDeleteClick(card.id)}
                  />,
                ]}
              >
                <div style={{ marginBottom: 10 }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      marginRight: 5,
                      fontSize: "16px",
                    }}
                  >
                    {card.name}
                  </span>
                </div>
                <div
                  style={{
                    marginBottom: 10,
                    fontSize: "16px",
                    color: "rgba(0, 0, 0, 0.65)",
                  }}
                >
                  <MailOutlined style={{ marginRight: 10 }} />
                  <span>{card.email}</span>
                </div>
                <div
                  style={{
                    marginBottom: 10,
                    fontSize: "16px",
                    color: "rgba(0, 0, 0, 0.65)",
                  }}
                >
                  <PhoneOutlined style={{ marginRight: 10 }} />
                  <span>{card.phone}</span>
                </div>
                <div
                  style={{
                    marginBottom: 10,
                    fontSize: "16px",
                    color: "rgba(0, 0, 0, 0.65)",
                  }}
                >
                  <GlobalOutlined style={{ marginRight: 10 }} />
                  <span>http://{card.website}</span>
                </div>
              </MemoizedCard>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default CardLayout;
