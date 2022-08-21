import { get } from "../../utils/request";
import { useEffect, useMemo, useState } from "react";
import { HttpRequest, JSError, Pv, ResourceError } from "@/types/types";
import { Tag } from "antd";
import { DualAxes, DualAxesConfig, Pie, PieConfig } from "@ant-design/plots";
import { formatDate } from "../../utils/utils";

const CountPie = ({ data }: { data: any }) => {
  const config: PieConfig = {
    autoFit: true,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      style: {
        fontSize: 21,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <div>
      <Pie {...config} />
    </div>
  );
};
const DashboardHomePage = () => {
  const [pvData, setPvData] = useState<Pv[]>([]);
  const [osMap, setOsMap] = useState<{ type: string; value: number }[]>([]);
  const [browserMap, setBrowserMap] = useState<
    { type: string; value: number }[]
  >([]);
  const [newPvData, setNewPvData] = useState<Pv[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await get("behavior");
      const pvData = res
        .filter((x: any) => x.behavior_type === "pv")
        .map((x: any) => {
          return { ...x, id: x._id.toString() };
        }) as Pv[];
      const filterPvData = pvData.filter(
        (x: any) =>
          (isNaN(Number(x.timestamp)) ? 0 : Number(x.timestamp)) >
          new Date().getTime() - 1000 * 60 * 60 * 24
      );
      const browserData: Record<string, number> = {};
      const osData: Record<string, number> = {};
      pvData.forEach((x) => {
        const info = x.user_agent.split(" ");
        if (info.length > 2) {
          browserData[info[0]] = browserData[info[0]]
            ? browserData[info[0]] + 1
            : 1;
          osData[info[2]] = osData[info[2]] ? osData[info[2]] + 1 : 1;
        }
      });
      setPvData(pvData);
      setNewPvData(filterPvData);
      setBrowserMap(
        Object.keys(browserData).map((x) => ({
          type: x,
          value: browserData[x],
        }))
      );
      setOsMap(Object.keys(osData).map((x) => ({ type: x, value: osData[x] })));
    };
    getData();
  }, []);

  const uvArray = useMemo(
    () => Array.from(new Set(pvData.map((x) => x.uuid))),
    [pvData]
  );
  const newUvArray = useMemo(
    () => Array.from(new Set(newPvData.map((x) => x.uuid))),
    [newPvData]
  );

  const timeData = Array(24)
    .fill(0)
    .map((x, index) => {
      const hourPvData = pvData.filter(
        (x: any) =>
          (isNaN(Number(x.timestamp)) ? 0 : Number(x.timestamp)) >
            new Date().getTime() - 1000 * 60 * 60 * (24 - index) &&
          (isNaN(Number(x.timestamp)) ? 0 : Number(x.timestamp)) <
            new Date().getTime() - 1000 * 60 * 60 * (23 - index)
      );
      return {
        time: formatDate(Date.now() - (23 - index) * 3600 * 1000),
        pv: hourPvData.length,
        uv: Array.from(new Set(hourPvData.map((x) => x.uuid))).length,
      };
    });
  const config: DualAxesConfig = {
    autoFit: true,
    data: [timeData, timeData],
    xField: "time",
    yField: ["pv", "uv"],
    legend: false,
    xAxis: {
      grid: null,
      line: null,
      title: null,
      label: null,
    },
    yAxis: {
      pv: {
        grid: null,
        line: null,
        title: null,
        label: null,
      },
      uv: {
        grid: null,
        line: null,
        title: null,
        label: null,
      },
    },
    padding: 20,
    geometryOptions: [
      {
        geometry: "line",
        color: "#5B8FF9",
        smooth: true,
      },
      {
        geometry: "line",
        color: "#5AD8A6",
        smooth: true,
      },
    ],
  };

  const [jsErrData, setjsErrData] = useState<JSError[]>([]);
  const [newJsErrData, setNewJsErrData] = useState<JSError[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await get("error/js");
      const errData = res.map((x: any) => {
        return { ...x, id: x._id.toString() };
      }) as JSError[];
      const filterErrData = errData.filter(
        (x: any) =>
          (isNaN(Number(x.timestamp)) ? 0 : Number(x.timestamp)) >
          new Date().getTime() - 1000 * 60 * 60 * 24
      );
      setjsErrData(errData);
      setNewJsErrData(filterErrData);
    };
    getData();
  }, []);

  const [resourceErrData, setResourceErrData] = useState<ResourceError[]>([]);
  const [newResourceErrData, setNewResourceErrData] = useState<ResourceError[]>(
    []
  );
  useEffect(() => {
    const getData = async () => {
      const res = await get("error/resource");
      const errData = res.map((x: any) => {
        return { ...x, id: x._id.toString() };
      }) as ResourceError[];
      const filterErrData = errData.filter(
        (x: any) =>
          (isNaN(Number(x.timestamp)) ? 0 : Number(x.timestamp)) >
          new Date().getTime() - 1000 * 60 * 60 * 24
      );
      setResourceErrData(errData);
      setNewResourceErrData(filterErrData);
    };
    getData();
  }, []);

  const [apiErrData, setApiErrData] = useState<HttpRequest[]>([]);
  const [newApiErrData, setNewApiErrData] = useState<HttpRequest[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await get("http");
      const errData = res
        .filter((x: any) => !x.success)
        .map((x: any) => {
          return { ...x, id: x._id.toString() };
        }) as HttpRequest[];
        console.log(errData);
      const filterErrData = errData.filter(
        (x: any) =>
          (isNaN(Number(x.timestamp)) ? 0 : Number(x.timestamp)) >
          new Date().getTime() - 1000 * 60 * 60 * 24
      );
      setApiErrData(errData);
      setNewApiErrData(filterErrData);
    };
    getData();
  }, []);

  return (
    <div className="w-full h-full">
        <div className="flex justify-center">
        <div className="grid w-full grid-cols-1 p-2 md:grid-cols-3 ">
          <div className="border-sm card bg-base-200 m-2 rounded-sm shadow-md">
            <div className="card-body flex-col justify-between">
              <div className="name mb-3 font-bold">JS错误总数</div>
              <div className="mb-2 text-4xl text-red-600">
                {jsErrData.length}
              </div>
              <Tag color="red" className="w-fit">
                24h新增错误数: {newJsErrData.length}
              </Tag>
            </div>
          </div>
          <div className="border-sm card bg-base-200 m-2 rounded-sm shadow-md">
            <div className="card-body flex-col justify-between">
              <div className="name mb-3 font-bold">资源错误总数</div>
              <div className="mb-2 text-4xl text-red-600">
                {resourceErrData.length}
              </div>
              <Tag color="red" className="w-fit">
                24h新增错误数: {newResourceErrData.length}
              </Tag>
            </div>
          </div>
          <div className="border-sm card bg-base-200 m-2 rounded-sm shadow-md">
            <div className="card-body flex-col justify-between">
              <div className="name mb-3 font-bold">API错误总数</div>
              <div className="mb-2 text-4xl text-red-600">
                {apiErrData.length}
              </div>
              <Tag color="red" className="w-fit">
                24h新增错误数: {newApiErrData.length}
              </Tag>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid w-full grid-cols-1 p-2 md:grid-cols-2 ">
          <div className="border-sm card bg-base-200 m-2 rounded-sm shadow-md">
            <div className="card-body flex-col justify-between">
              <div className="name mb-3 font-bold">浏览量(PV)</div>
              <div className="mb-2 text-4xl text-violet-600">
                {pvData.length}
              </div>
              <Tag color="purple" className="w-fit">
                24h新增浏览量: {newPvData.length}
              </Tag>
            </div>
          </div>
          <div className="border-sm card bg-base-200 m-2 rounded-sm shadow-md">
            <div className="card-body flex-col justify-between">
              <div className="name mb-3 font-bold">访客数(UV)</div>
              <div className="mb-3 text-4xl text-blue-600">
                {uvArray.length}
              </div>
              <Tag color="blue" className="w-fit">
                {" "}
                24h新增访客数:{" "}
                {uvArray.length -
                  uvArray.filter(function (v) {
                    return newUvArray.indexOf(v) === -1;
                  }).length}
              </Tag>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full h-[300px]">
        <div className="border-sm card bg-base-200 m-2 rounded-sm shadow-md w-full">
          <div className="card-body flex-col justify-between">
            <div className="name mb-3 font-bold">近24小时PV、UV趋势图</div>
            <DualAxes {...config} style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid w-full grid-cols-1 p-2 md:grid-cols-2 ">
          <div className="border-sm card bg-base-200 m-2 rounded-sm shadow-md">
            <div className="card-body flex-col justify-between">
              <div className="name font-bold">操作系统占比</div>
              <CountPie data={osMap} />
            </div>
          </div>
          <div className="border-sm card bg-base-200 m-2 rounded-sm shadow-md">
            <div className="card-body flex-col justify-between">
              <div className="name font-bold">浏览器占比</div>
              <CountPie data={browserMap} />
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};
export default DashboardHomePage;
