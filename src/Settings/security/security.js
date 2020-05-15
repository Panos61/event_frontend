import React from 'react';
import './security.css';

import { PageHeader, Button, Card, Form, Input } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import store from '../../store/index';
import { Provider, useSelector, useDispatch } from 'react-redux';
import FooterMain from '../../Footer';
import { updatePassword } from '../../store/modules/auth/actions/authActions';
import {
  SafetyCertificateOutlined,
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Security = () => {
  const currentUserState = useSelector((state) => state.Auth);
  const AuthID = currentUserState.currentUser
    ? currentUserState.currentUser.id
    : '';

  const dispatch = useDispatch();

  const newPassword = (values) => {
    dispatch(updatePassword(values));
  };

  // Redirect unauthorized user to login page
  if (!currentUserState.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Provider store={store}>
        <PageHeader
          className="security-page-header"
          onBack={() => window.history.back()}
          title="Ασφάλεια"
          subTitle={<SafetyCertificateOutlined />}
          extra={[
            <Button key="mainpage" size="small" type="primary">
              <Link to="/">Αρχική Σελίδα</Link>
            </Button>,
          ]}
        />

        {/* CONTENT CARDS  */}

        <section id="security-layout-style">
          <div id="security-page-parent">
            <div className="security-page-card">
              {/*  Account Status */}
              <Card
                title="Ρυθμίσεις"
                style={{ marginTop: '15px', borderColor: '#bfbfbf' }}
              >
                <Card type="inner" title="Αλλαγή Κωδικού">
                  <Form {...layout} onFinish={newPassword}>
                    <Form.Item
                      label="Παλιός κωδικός"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Εισάγετε τον παλιό κωδικό σας!',
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Παλιός κωδικός"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Καινούργιος κωδικός"
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          pattern: /^(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
                          message: 'Εισάγετε τον καινούργιο κωδικό σας!',
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Καινούργιος κωδικός"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Επιβεβαίωση"
                      name="confirmPassword"
                      // dependencies={['newPassword']}
                      rules={[
                        {
                          required: true,
                          message: 'Επιβεβαιώστε τον καινούργιο κωδικό σας!',
                        },
                        // ({ getFieldValue }) => ({
                        //   validator(value) {
                        //     if (!value || getFieldValue('password') === value) {
                        //       return Promise.resolve();
                        //     }

                        //     return Promise.reject(
                        //       'Οι κωδικοί σας δεν ταιριάζουν!'
                        //     );
                        //   },
                        // }),
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Επιβεβαίωση καινούργιου κωδικού"
                      />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        Ενημέρωση Κωδικού
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
                <Card
                  type="inner"
                  title="Αλλαγή Ε-mail"
                  style={{ marginTop: '15px' }}
                >
                  <Form {...layout}>
                    <Form.Item
                      label="Παλιό E-mail"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Εισάγετε παλιό το E-mail σας!',
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <MailOutlined className="site-form-item-icon" />
                        }
                        type="email"
                        placeholder="Παλιό E-mail"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Καινούργιο E-mail"
                      name="newEmail"
                      rules={[
                        {
                          required: true,
                          message: 'Εισάγετε το καινούργιο E-mail σας!',
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Καινούργιο E-mail"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Κωδικός"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Εισάγετε τον κωδικό σας!',
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Κωδικός"
                      />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        Ενημέρωση E-mail
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Card>
            </div>
          </div>
        </section>
        <footer>
          <FooterMain />
        </footer>
      </Provider>
    </div>
  );
};

export default Security;