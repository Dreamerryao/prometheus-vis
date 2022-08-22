import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { List, Avatar, Timeline, Card } from "antd";
import {
  paddingNumber,
  randomColor,
  formatDate,
  string2number,
} from "../../utils/utils";
import { get } from "../../utils/request";
import { Pv, StayTime } from "@/types/types";

interface User {
  uuid: string;
  pv: number;
  color: string;
  timestamp: number;
}
const calcSinglePv = (arr: Pv[]) => {
  let ret: User[] = [];
  let map: Record<string, { pv: number; timestamp: number }> = {};
  arr.forEach((i) => {
    if (map[i.uuid] !== undefined || (map[i.uuid] = { pv: 0, timestamp: 0 })) {
      map[i.uuid].pv++;
      map[i.uuid].timestamp = Math.max(
        map[i.uuid].timestamp,
        string2number(i.timestamp)
      );
    }
  });
  Object.keys(map).forEach((i) => {
    ret.push({
      uuid: i,
      pv: map[i].pv,
      color: randomColor(),
      timestamp: map[i].timestamp,
    });
  });
  console.log(ret);
  return ret;
};
const UserList = ({
  users,
  userIndex,
  setUserIndex,
}: {
  users: User[];
  userIndex?: User;
  setUserIndex: (s?: User) => void;
}) => {
  return (
    <List
      pagination={{ position: "bottom" }}
      dataSource={users}
      header={
        <span className="item-wrapper" onClick={(e) => setUserIndex(undefined)}>
          全部访客
        </span>
      }
      renderItem={(user) => (
        <div
          className={`item-wrapper item-wrapper-hover ${
            userIndex && userIndex.uuid === user.uuid
              ? "item-wrapper-selected"
              : ""
          }`}
        >
          <List.Item onClick={() => setUserIndex(user)}>
            <List.Item.Meta
              description={formatDate(user.timestamp)}
              avatar={
                <Avatar
                  style={{ background: "#fff" }}
                  icon={<UserOutlined style={{ color: user.color }} />}
                ></Avatar>
              }
              title={`uuid${user.uuid}`}
            ></List.Item.Meta>
          </List.Item>
        </div>
      )}
    ></List>
  );
};
const BehaviorTimeLine = ({
  pdata,
  userIndex,
}: {
  pdata: StayTime[];
  userIndex: User;
}) => {
  const [data, setData] = useState<StayTime[]>([]);
  useEffect(() => {
    let data = pdata.filter((i) => {
      if (i.uuid === userIndex.uuid) return true;
      return false;
    });
    setData(data);
  }, [userIndex, pdata]);
  return (
    <Timeline mode="left">
      {data &&
        data
          .sort(
            (a, b) => string2number(b.timestamp) - string2number(a.timestamp)
          )
          .map((i) => (
            <Timeline.Item label={formatDate(string2number(i.timestamp))}>
              {
                <div>
                  <div>URL:{i.url}</div>
                  <div>{`停留时间：${i.stay_time??0}`}</div>
                </div>
              }
            </Timeline.Item>
          ))}
    </Timeline>
  );
};

const DashboardBehaviorPage = () => {
  const [data, setData] = useState<Pv[]>([]);
  const [stayData, setStayData] = useState<StayTime[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userIndex, setUserIndex] = useState<User | undefined>(undefined);
  useEffect(() => {
    const getData = async () => {
      const res = await get("behavior");
      const pvData = res
        .filter((x: any) => x.behavior_type === "pv")
        .map((x: any) => {
          return { ...x, id: x._id.toString() };
        }) as Pv[];
      const stayData = res
        .filter((x: any) => x.behavior_type !== "pv")
        .map((x: any) => {
          return { ...x, id: x._id.toString() };
        }) as StayTime[];
      setData(pvData);
      setStayData(stayData);
      setUsers(calcSinglePv(pvData).sort((a, b) => b.timestamp - a.timestamp));
    };
    getData();
  }, []);
  useEffect(() => {
    if (users.length > 0) setUserIndex(users[0]);
  }, [users]);
  return (
    <div className="behavior">
      <div className="list-wrapper">
        <UserList
          users={users}
          setUserIndex={setUserIndex}
          userIndex={userIndex}
        ></UserList>
      </div>
      <div className="timeline-wrapper">
        {data && userIndex && (
          <BehaviorTimeLine
            userIndex={userIndex}
            pdata={stayData}
          ></BehaviorTimeLine>
        )}
      </div>
    </div>
  );
};
export default DashboardBehaviorPage;
