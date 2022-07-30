import { LineChartOutlined} from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import React, { useState } from 'react';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
    getItem('首页概览', 'sub0', <LineChartOutlined />),
    getItem('异常监控', 'sub1', <LineChartOutlined />, [
        getItem('JS错误', '1'),
        getItem('资源异常', '2'),
        getItem('接口错误', '3'),
        getItem('白屏', '4'),
    ]),
    getItem('HTTP请求监控', 'sub2', <LineChartOutlined />,),
    getItem('性能监控', 'sub4', <LineChartOutlined />, [
        getItem('FP', '9'),
        getItem('FCP', '10'),
        getItem('FMP', '11'),
        getItem('FID', '12'),
        getItem('卡顿', '13')
    ]),
    getItem('用户行为监控', 'sub3', <LineChartOutlined />, [
        getItem('PV', '14'),
        getItem('UV', '15'),
        getItem('页面停留时间', '16')
    ]),
];

const App = () => {
  const [theme, setTheme] = useState('light');
  const [current, setCurrent] = useState('1');

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
      {/* <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br /> */}
      <Menu
        theme={theme}
        onClick={onClick}
        style={{
          width: '100%',
          height: '100%'
        }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default App;