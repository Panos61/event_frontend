import React, { Component } from 'react';
import { compose } from 'redux';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { login } from '../../store/modules/auth/actions/authActions';
import { returnErrors } from '../../store/modules/auth/actions/errorActions';
import PropTypes from 'prop-types';

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

const linkLayout = {
  wrapperCol: {
    span: 16,
    offset: 6,
  },
};

class WrappedNormalLoginForm extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func.isRequired,
    Error: PropTypes.object.isRequired,
    returnErrors: PropTypes.func.isRequired,
    Auth: PropTypes.object.isRequired,
  };

  state = {
    message: null,
    status: null,
  };

  componentDidUpdate(prevProps) {
    const { Error } = this.props;
    if (Error !== prevProps.Error) {
      // Check for login error
      if (Error.status === 'LOGIN_ERROR') {
        this.setState({ message: Error.message });
      } else {
        this.setState({ message: null });
      }
    }
  }

  render() {
    const onFinish = (values) => {
      this.props.login(values);
    };

    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
      >
        {this.state.message ? (
          <Alert
            style={{ marginBottom: '5px' }}
            type="error"
            message="Σφάλμα Σύνδεσης"
            description="Το E-mail ή το Password που εισάγατε, είναι λάθος!"
            // {this.state.message}
            showIcon
          />
        ) : null}
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: 'Εισάγετε το E-mail σας!',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="E-mail"
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
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Κωδικός"
          />
        </Form.Item>
        <Form.Item {...tailLayout} valuePropName="checked">
          <Checkbox disabled>Αποθήκευση</Checkbox>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Σύνδεση
          </Button>
        </Form.Item>
        <Form.Item style={{ marginLeft: '15px' }}>
          Ή{' '}
          <Link to="/register" style={{ color: 'crimson' }}>
            εγγραφείτε τώρα!
          </Link>
        </Form.Item>

        <Form.Item style={{ marginBottom: '-10px' }} {...linkLayout}>
          <Link to="/reset-password">Ξεχάσατε τον κωδικό σας;</Link>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  Error: state.Error,
  Auth: state.Auth,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { login, returnErrors })
)(WrappedNormalLoginForm);
