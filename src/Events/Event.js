import React from 'react';
import './Events.css';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import { CarryOutOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Event = ({ event }) => {
  const currentState = useSelector((state) => state);
  const authID = currentState.Auth.currentUser
    ? currentState.Auth.currentUser.id
    : '';

  return (
    <Card
      className="event-card"
      key={event.id}
      title={event.title}
      style={{ marginTop: '20px' }}
      size="small"
      hoverable={true}
      cover={
        <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
      }
      actions={[<CarryOutOutlined key="interested" />]}
    >
      <Meta description="Date-Placeholder" />
    </Card>
  );
};

export default Event;
