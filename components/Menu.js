import { 
  ChromeOutlined, 
  BugOutlined, 
  BulbOutlined,
  DashboardOutlined,
  ApiOutlined
} from '@ant-design/icons';
import { Menu} from 'antd';
import React, { useState } from 'react';
import {useRouter} from 'next/router'


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
  // key
    getItem('首页概览', '/dashboard/', <ChromeOutlined />),
    getItem('异常监控', '/dashboard/error', <BugOutlined />, [
        getItem('JS错误', '/js'),
        getItem('资源异常', '/resource')
    ]),
    getItem('HTTP请求监控', '/dashboard/http', <BulbOutlined />,),
    getItem('性能监控', '/dashboard/performence', <DashboardOutlined />, [
        getItem('页面加载', '/timing'),
        getItem('页面渲染', '/paint')
    ]),
    getItem('用户行为监控', '/dashboard/behavior', <ApiOutlined /> ),
]

const App = (props) => {
  const [theme, setTheme] = useState('light');
  const [current, setCurrent] = useState('1');
  const router = useRouter()
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    router.push(e.keyPath.reverse().join(''))
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