import React, { useEffect } from 'react';
import Moment from 'react-moment';
import 'moment/locale/el';
import { useSelector, useDispatch } from 'react-redux';
import { Affix, Button, Divider, BackTop, Layout, Collapse } from 'antd';
import './DataLayout.css';
import { fetchEvent } from '../../store/modules/events/actions/eventAction';
import { HeartFilled, ArrowLeftOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Panel } = Collapse;

const DataDisplay = (props) => {
  const eventID = props.match.params.id;

  const dispatch = useDispatch();
  const singleEvent = (id) => dispatch(fetchEvent(id));

  const currentState = useSelector((state) => state);

  const event = currentState.Event.event;

  const authID = currentState.Auth.currentUser
    ? currentState.Auth.currentUser.id
    : '';

  useEffect(() => {
    singleEvent(eventID);
  }, []);

  return (
    <>
      <section id="event-data-layout">
        <Affix offsetTop={12}>
          <Button
            size="medium"
            onClick={() => window.history.back()}
            type="dashed"
            icon={<ArrowLeftOutlined />}
          >
            Πίσω
          </Button>
        </Affix>

        <div className="event-container-parent">
          <div className="event-container">
            <div className="event-title">
              {event.title}{' '}
              <span style={{ fontSize: 'small' }}>{event.id}</span>
              <span style={{ float: 'right', fontSize: 'initial' }}>
                <Moment fromNow locale="el">
                  {event.created_at}
                </Moment>{' '}
                <br />
                <span style={{ fontSize: 'small', color: '#237804' }}>
                  {event.category}
                </span>
              </span>
            </div>

            <Divider />

            <div className="event-date">
              <h4>Ημερομηνία:</h4>
              <span>some date</span>
            </div>
            <h4>Δημιουργός:</h4>
            <div className="event-creator" style={{ marginBottom: '15px' }}>
              {event.creator ? event.creator.username : ''}
            </div>

            <h4>Περιγραφή:</h4>
            <div className="event-description">{event.description}</div>

            <Divider />

            <Collapse bordered={false}>
              <Panel header="Λοιπές Πληροφορίες">
                <h4>Σχόλια Δημιουργού:</h4>
                {event.comments ? event.comments : 'Κανένα σχόλιο.'} <br />
                {event.ageRestricted ? event.ageRestricted : ''}
              </Panel>
            </Collapse>
          </div>
        </div>
        <BackTop />
      </section>

      <footer>
        <Footer
          style={{
            textAlign: 'center',
            backgroundColor: 'unset',
          }}
        >
          EventPark ©2020 Created with <HeartFilled /> by us!
        </Footer>
      </footer>
    </>
  );
};

export default DataDisplay;
