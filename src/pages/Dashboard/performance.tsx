import React, { useEffect, useState } from "react";

import { Column, Bar } from "@ant-design/plots";
import { Popover } from "antd";
import { get, post } from "../../utils/request";
import { Paint } from "@/types/types";
const aliasMap = {
  dns_time: "DNS查询",
  connect_time: "TCP连接耗时",
  ttfb_time: "首字节到达",
  response_time: "响应时间",
  parse_dom_time: "DOM解析渲染",
  dom_content_loaded_time: "DOMContentLoaded事件回调",
  time_to_interactive: "首次可交互",
  load_time: "完整加载时间",
  first_paint: "首次绘制",
  first_content_paint: "首次内容绘制",
  first_meaningful_paint: "首次有意义绘制",
  largest_contentful_paint: "最大内容渲染",
  first_input_delay: "首次输入延迟",
};
const calcAverage = (arr: Paint[], ...keys: string[]) => {
  let data: Record<string, number> = {};
  keys.forEach((i) => {
    data[i] = 0;
  });
  arr.forEach((i) => {
    keys.forEach((j) => {
      data[j] += Number(i[j as keyof Paint] ?? 0);
    });
  });
  return data;
};
const PerformentceColumn = ({ urlIndex }: { urlIndex?: string }) => {
  const [data, setData] = useState<{ name: string; time: number }[]>([]);
  useEffect(() => {
    post("performance/paint", {
      url: urlIndex,
    }).then((e) => {
      if (e) {
        let data = calcAverage(
          e,
          "first_paint",
          "first_content_paint",
          "first_meaningful_paint",
          "largest_contentful_paint",
          "first_input_delay"
        );
        Object.keys(data).forEach((key) => {
          data[key] /= e.length;
        });
        let temp: { name: string; time: number }[] = [];
        Object.keys(data).forEach((i) => {
          temp.push({ name: i, time: data[i] });
        });
        setData(temp);
      } else {
        setData([]);
      }
    });
  }, [urlIndex]);
  const config = {
    data: data,
    xField: "name",
    yField: "time",
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      name: {
        alias: "渲染时期",
        formatter(name: string) {
          return aliasMap[name as keyof typeof aliasMap];
        },
      },
      time: {
        alias: "花费时间",
      },
    },
    color: "rgb(24, 144, 255)",
  };
  return <Column {...config} />;
};
const TimingBar = ({ urlIndex }: { urlIndex?: string }) => {
  const [data, setData] = useState<{ name: string; times: number[] }[]>([]);
  useEffect(() => {
    post("performance/timing", {
      url: urlIndex,
    }).then((e) => {
      if (e) {
        let data = calcAverage(
          e,
          "dns_time",
          "connect_time",
          "ttfb_time",
          "response_time",
          "parse_dom_time",
          "load_time"
        );
        let temptime = 0;
        let temp: { name: string; times: number[] }[] = [];
        Object.keys(data).forEach((key) => {
          data[key] /= e.length;
        });
        Object.keys(data).forEach((i) => {
          if (i !== "load_time")
            temp.push({ name: i, times: [temptime, (temptime += data[i])] });
        });
        temp.push({ name: "load_time", times: [0, data["load_time"]] });
        setData(temp);
      } else {
        setData([]);
      }
    });
  }, [urlIndex]);
  const config = {
    data: data,
    xField: "times",
    yField: "name",
    isRange: true,
    meta: {
      name: {
        formatter(name: string) {
          return aliasMap[name as keyof typeof aliasMap];
        },
      },
    },
    color: "rgb(253, 208, 137)",
  };
  return <Bar {...config} />;
};


const DashboardPerformancePage = () => {
  const [urlList, setUrlList] = useState<string[]>([]);
  const [urlIndex, setUrlIndex] = useState<string | undefined>(undefined);
  useEffect(() => {
    const getUrlList = async () => {
      const res = await get("urllist");
      setUrlList(res);
    };
    getUrlList();
  }, []);
  useEffect(() => {
    if (urlList.length > 0) setUrlIndex(urlList[0]);
  }, [urlList]);
  function changeUrl(newUrl?: string) {
    setUrlIndex(newUrl);
  }
  return (
    <div className="flex h-full w-full">
      <div className="w-[200px] m-4">
        <div className="m-2">全部地址</div>
        <div className="overflow-y-scroll">
          {urlList.map((i) => (
            <Popover content={i} placement="topRight" key={i}>
              <div className="url-item" onClick={() => changeUrl(i)}>
                {i}
              </div>
            </Popover>
          ))}
        </div>
      </div>
      <div className="flex-grow m-4">
        <div className="paint-wrapper">
          <div className="paint-wrapper-header">平均渲染时间 ms</div>
          <div className="h-[200px]">
            {urlIndex && (
              <PerformentceColumn urlIndex={urlIndex}></PerformentceColumn>
            )}
          </div>
        </div>
        <div className="paint-wrapper">
          <div className="paint-wrapper-header">平均加载时间 ms</div>
          <div className="h-[200px]">
            {urlIndex && <TimingBar urlIndex={urlIndex}></TimingBar>}
          </div>
        </div>
      </div>
      {/* <style jsx>{`
            .performence{
                display: flex;
                height: 100%;
            }
            .url-list-wrapper{
                width: 250px;
                padding: 20px;
            }
            .url-list{
                height: 100%;
                overflow: scroll;
            }
            .url-item{
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                margin-bottom: 10px;
                height: 40px;
                line-height: 40px;
                text-indent: 1em;
                cursor: pointer;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-right: 50px;
                position: relative;
            }
            .url-item::after{
                content: ">";
                position: absolute;
                right: 1em;
                line-height: 40px;
            }
            .url-item:hover{
                background: #eee;
            }
            .container{
                flex-grow: 1;
                padding: 20px;
            }
            .paint-wrapper{
                border: 1px solid #ccc;
                padding: 0 20px;
                margin-bottom: 30px;
            }
            .paint-wrapper-header{
                height: 30px;
                line-height:30px;
                text-indent: 2em;
                border-bottom: 1px solid #ccc;
            }
            .paint-chart{
                height: 280px;
            }
            .url-list-wrapper-header{
                margin:8px;
            }
        `}</style> */}
    </div>
  );
}
export default DashboardPerformancePage;
