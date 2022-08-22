import { Table, Select, Input, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { formatDate, string2number } from "../../utils/utils";
import { get } from "../../utils/request";
import type { ColumnsType } from "antd/es/table";
import { JSError } from "@/types/types";
const { Search } = Input;

const columns: ColumnsType<JSError> = [
  {
    title: "时间",
    dataIndex: "timestamp",
    key: "timestamp",
    render: (timestamp: string) =>
      formatDate(new Date(string2number(timestamp))),
    sorter: (a: JSError, b: JSError) =>
      string2number(a.timestamp) - string2number(b.timestamp),
    defaultSortOrder: "descend",
  },
  {
    title: "错误类型",
    dataIndex: "error_type",
    key: "error_type",
  },
  {
    title: "错误信息",
    dataIndex: "message",
    key: "message",
  },
  {
    title: "错误栈",
    dataIndex: "stack",
    key: "stack",
    ellipsis: {
      showTitle: false,
    },
    render: (stack) => (
      <Tooltip placement="topLeft" title={stack}>
        {stack}
      </Tooltip>
    ),
  },
  {
    title: "发生页面",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "发生页面url",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "浏览器",
    dataIndex: "user_agent",
    key: "user_agent",
  },
];
const useSelected = (
  data: JSError[] = [],
  defaultLimitTime = 0,
  defaultSearchKey = "",
  defaultErrorType = ""
) => {
  const [limitTime, setLimitTime] = useState(defaultLimitTime);
  const [searchKey, setSearchKey] = useState(defaultSearchKey);
  const [errorType, setErrorType] = useState(defaultErrorType);
  const [selectedData, setSelectedData] = useState<JSError[]>([]);
  useEffect(() => {
    let selectedData;
    selectedData = data.filter((i) => {
      if (
        limitTime !== 0 &&
        Date.now() - string2number(i.timestamp) >= limitTime * 1000
      ) {
        return false;
      }
      if (errorType !== "" && i.error_type !== errorType) {
        return false;
      }
      let ret = false;
      for (let key in i) {
        if (i[key as "url"].match(searchKey)) {
          ret = true;
          break;
        }
      }
      return ret;
    });
    setSelectedData(selectedData);
  }, [limitTime, searchKey, errorType, data]);
  return {
    limitTime,
    setLimitTime,
    searchKey,
    setSearchKey,
    errorType,
    setErrorType,
    selectedData,
    setSelectedData,
  };
};


const DashboardJsErrorPage = () => {
  const [data, setData] = useState<JSError[]>([]);
  const [allErrorType, setAllErrorType] = useState<string[]>([]);
  const {
    limitTime,
    setLimitTime,
    setSearchKey,
    errorType,
    setErrorType,
    selectedData,
  } = useSelected(data, 0, "", "");
  useEffect(() => {
    const getData = async () => {
      const res = await get("error/js");
      const allErrorType: Record<string, number> = {};
      const errData = res.map((x: any) => {
        if (!allErrorType[x.error_type]) {
          allErrorType[x.error_type] = 1;
        }
        return { ...x, id: x._id.toString() };
      }) as JSError[];
      setData(errData);
      setAllErrorType(Object.keys(allErrorType));
    };
    getData();
  }, []);
  return (
    <div className="flex-col p-4 w-full h-full">
      <div>
        <Search
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          placeholder="关键词"
          enterButton="搜索"
          size="large"
          allowClear
        ></Search>
      </div>
      <div className="h-[60px] my-2 flex items-center">
        <div className="mr-2">
          <Select
            value={limitTime}
            style={{ width: 120 }}
            onChange={(i) => {
              setLimitTime(i);
            }}
          >
            <Select.Option key={0} value={0}>
              全部
            </Select.Option>
            <Select.Option key={3600} value={3600}>
              1小时内
            </Select.Option>
            <Select.Option key={14400} value={14400}>
              4小时内
            </Select.Option>
            <Select.Option key={21600} value={21600}>
              6小时内
            </Select.Option>
            <Select.Option key={43200} value={43200}>
              12小时内
            </Select.Option>
            <Select.Option key={86400} value={86400}>
              24小时内
            </Select.Option>
            <Select.Option key={604800} value={604800}>
              一周内
            </Select.Option>
          </Select>
        </div>
        <div className="mr-2">
          <Select
            value={errorType}
            onChange={(i) => {
              setErrorType(i);
            }}
            style={{ width: 120 }}
          >
            <Select.Option key={""} value={""}>
              全部
            </Select.Option>
            {allErrorType.map((i) => (
              <Select.Option key={i} value={i}>
                {i}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="">共{selectedData.length}条错误</div>
      </div>
      <div className="flex-grow overflow-scroll">
        <Table
          columns={columns}
          dataSource={selectedData}
          pagination={{ position: ["bottomCenter"] }}
          scroll={{
            scrollToFirstRowOnChange: true,
            y: "calc(100vh - 300px)",
          }}
        />
      </div>
    </div>
  );
};
export default DashboardJsErrorPage;
