import React, { useEffect, useState } from "react";
import { Table, Modal, Descriptions } from "antd";
import { formatDate, string2number } from "../../utils/utils";
import { HttpRequest } from "@/types/types";
import { get } from "../../utils/request";
import { ColumnsType } from "antd/lib/table";
const HttpDetailModal = ({
  detail,
  setDetail,
}: {
  detail?: HttpRequest;
  setDetail: (newDetail?: HttpRequest) => void;
}) => {
  const [data, setData] = useState(detail);
  useEffect(() => {
    setData(detail);
  }, [detail]);
  if (!data) return <></>;
  return (
    <Modal visible footer={null} onCancel={() => setDetail(undefined)}>
      <Descriptions bordered column={1} className="m-4">
        <Descriptions.Item label="日期">
          {formatDate(string2number(data.timestamp))}
        </Descriptions.Item>
        <Descriptions.Item label="日志类型">{data.type}</Descriptions.Item>
        <Descriptions.Item label="使用js接口">
          {data.api_type}
        </Descriptions.Item>
        <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
        <Descriptions.Item label="接口地址">{data.path_url}</Descriptions.Item>
        <Descriptions.Item label="是否成功">
          {data.success ? "成功" : "失败"}
        </Descriptions.Item>
        <Descriptions.Item label="状态码">{data.status}</Descriptions.Item>
        <Descriptions.Item label="持续时间">{data.duration}</Descriptions.Item>
        <Descriptions.Item label="请求头">
          {data.request_header}
        </Descriptions.Item>
        <Descriptions.Item label="请求体">
          {data.request_body}
        </Descriptions.Item>
        <Descriptions.Item label="响应头">
          {data.response_header}
        </Descriptions.Item>
        <Descriptions.Item label="响应体">
          {data.response_body}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};
const HttpLogTable = () => {
  const [data, setData] = useState<HttpRequest[]>([]);
  const [detail, setDetail] = useState<HttpRequest | undefined>();
  useEffect(() => {
    const getData = async () => {
      const res = await get("http");
      const apiData = res.map((x: any) => {
        return { ...x, id: x._id.toString() };
      }) as HttpRequest[];
      setData(apiData);
    };
    getData();
  }, []);
  const columns: ColumnsType<HttpRequest> = [
    {
      title: "时间",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp: string) =>
        formatDate(new Date(string2number(timestamp))),
      sorter: (a: HttpRequest, b: HttpRequest) =>
        string2number(a.timestamp) - string2number(b.timestamp),
      defaultSortOrder: "descend",
    },
    {
      title: "日志类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "使用js接口",
      dataIndex: "api_type",
      key: "api_type",
    },
    {
      title: "请求方法",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "接口地址",
      dataIndex: "path_url",
      key: "path_url",
    },
    {
      title: "是否成功",
      dataIndex: "success",
      key: "success",
      render: (e?: boolean) => {
        if (e) return "成功";
        return "失败";
      },
    },
    {
      title: "状态码",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "持续时间",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "详情",
      key: "detail",
      render: (_, obj) => (
        <div
          style={{ color: "#2a79d7", cursor: "pointer" }}
          onClick={() => setDetail(obj)}
        >
          详情
        </div>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data}></Table>
      <HttpDetailModal detail={detail} setDetail={setDetail}></HttpDetailModal>
    </>
  );
};
const DashboardHttpPage = () => {
  return (
    <div>
      <HttpLogTable />
    </div>
  );
};
export default DashboardHttpPage;
