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
import DashboardJsErrorPage from "./jsError";
import DashboardResourceErrorPage from "./resourceError";
import DashboardHttpPage from "./http";
import DashboardPerformancePage from "./performance";
import DashboardBehaviorPage from "./behavior";
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
          {currentKey === "home" && <DashboardHomePage />}
          {currentKey === "jsError" && <DashboardJsErrorPage />}
          {currentKey === "resourceError" && <DashboardResourceErrorPage />}
          {currentKey === "api" && <DashboardHttpPage />}
          {currentKey === "performance" && <DashboardPerformancePage />}
          {currentKey === "behavior" && <DashboardBehaviorPage />}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
