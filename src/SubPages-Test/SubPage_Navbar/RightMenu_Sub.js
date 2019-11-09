import React, { Component } from 'react';
import { Menu, Select } from 'antd';
import { Link, Route } from 'react-router-dom';
import CardLoginStyle from '../LoginForm/LoginFormStyle';
import CardRegisterStyle from '../RegisterForm/SignUpStyle';

const { Option } = Select;

class RightMenu_Sub extends Component {
  render() {
    return (
      <div>
        <Menu mode={this.props.mode}>
          <Select
            defaultValue='Greek'
            style={{ width: '130px', marginBottom: '15px', marginRight: '10px', marginLeft: '10px' }}
            onChange={handleChange}
          >
            <Option value='English'>Αγγλικά(ENG)</Option>
            <Option value='Greek'>Ελληνικά(GR)</Option>
          </Select>

          <Menu.Item key='mail'>
            <Link to='/login'>Σύνδεση</Link>
          </Menu.Item>

          <Menu.Item key='app'>
            <Link to='/register'>Εγγραφή</Link>
          </Menu.Item>
        </Menu>

        <Route path='/login' Component={CardLoginStyle} />
        <Route path='/register' Component={CardRegisterStyle} />
      </div>
    );
  }
}

export default RightMenu_Sub;