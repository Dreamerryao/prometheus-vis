import React, { useState, ReactNode } from "react";
import { Button, Layout, Menu } from "antd";
import { useWebsiteContext } from "../../contexts/WebsiteProvider";
import {
  ApiOutlined,
  BugOutlined,
  BulbOutlined,
  ChromeOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import DashboardHomePage from "./home";
const { Content, Sider } = Layout;
function getItem(label: string, key: string, icon?: ReactNode, children?: any) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  // key
  getItem("概览", "home", <ChromeOutlined />),
  getItem("异常监控", "error", <BugOutlined />, [
    getItem("JS错误", "jsError"),
    getItem("资源异常", "resourceError"),
  ]),
  getItem("HTTP请求监控", "api", <BulbOutlined />),
  getItem("性能监控", "performance", <DashboardOutlined />),
  getItem("用户行为监控", "behavior", <ApiOutlined />),
];
const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentWebsite, onChangeWebsite } = useWebsiteContext();
  const [currentKey, setCurrentKey] = useState("home");
  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        theme="light"
        breakpoint="lg"
        onCollapse={(collapsed) => {
          setCollapsed(collapsed);
        }}
      >
        <Button
          type="link"
          className="w-full mx-auto mt-6"
          onClick={() => onChangeWebsite(undefined)}
        >
          {!collapsed ? "<- 返回网站列表" : "<-"}
        </Button>
        {!collapsed && (
          <div className="mx-auto w-fit font-medium text-gray-700 my-4">
            {currentWebsite?.title ?? ""}
          </div>
        )}
        <Menu
          mode="inline"
          defaultSelectedKeys={["home"]}
          onSelect={({ key }) => {
            setCurrentKey(key);
          }}
          style={{ border: "none" }}
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          height: "100vh",
          overflow: "auto",
          position: "relative",
          background: "white",
        }}
      >
        <Content style={{ margin: "24px 16px 0", background: "transparent" }}>
          
          {/* {currentKey === "event" && currentEventId < 0 && (
            <EventManagePage
              onChangeEventId={(eid: number) => setCurrentEventId(eid)}
            />
          )}
          {currentKey === "event" && currentEventId >= 0 && (
            <RecordManagePage eid={currentEventId} onBack={onBack} />
          )}
          {currentKey === "user" && <StudentManagePage />} */}
          {currentKey === "home" && <DashboardHomePage />}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
