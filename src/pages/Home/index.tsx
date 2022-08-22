import { get, post } from "../../utils/request";
import { LineChartOutlined } from "@ant-design/icons";
// import { DualAxes, DualAxesConfig } from "@ant-design/plots";
// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useWebsiteContext, Website } from "../../contexts/WebsiteProvider";
import { useHistory } from "react-router-dom";

interface WebsiteCreateFormProps {
  visible: boolean;
  onCreate: (values: Website) => void;
  onCancel: () => void;
}

const WebsiteCreateForm: React.FC<WebsiteCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="创建一个网站"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "请输入网站标题",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="url"
          label="Url"
          rules={[
            {
              required: true,
              message: "请输入网站url",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="Description">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default function HomePage() {
  const { onChangeWebsite } = useWebsiteContext();
  const history = useHistory();
  const [data, setData] = useState<Website[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await get("websites");
      setData(
        res.map((x: any) => {
          return { ...x, id: x._id.toString() } as Website;
        })
      );
    };

    getData();
  }, []);
  const onCreate = async (values: any) => {
    const createV: Website = {
      title: values.title,
      url: values.url,
      desc: values.desc,
      creator: "admin",
    };
    const res = await post("website/create", createV);
    if (res) {
      setData([...data, { ...createV, id: res.InsertedID }]);
    }
    setVisible(false);
  };
  return (
    <>
      <div className="header flex items-center justify-between">
        <span className="flex items-center">
          <LineChartOutlined />
          <div className="title">prometheus-vis</div>
        </span>
        <Button
          className="mx-2"
          onClick={() => {
            setVisible(true);
          }}
        >
          添加网站
        </Button>
        <WebsiteCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </div>
      <div className="content">
        <div className="flex justify-center">
          <div className="grid w-full grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((i, index) => (
              <div
                key={index}
                className="border-sm card bg-base-200 m-2 rounded-sm shadow-md"
              >
                <div
                  className="card-body flex-col justify-between cursor-pointer"
                  onClick={() => {
                    onChangeWebsite(i);
                    history.push("/dashboard");
                  }}
                >
                  <div className="name mb-3 font-bold">{i.title}</div>
                  <div className="url mb-2">
                    <span className="text-violet-600">id: {i.id}</span>
                  </div>
                  <div className="url mb-2">URL: {i.url}</div>
                  <div className="mb-2">Creator: {i.creator}</div>
                  {i.desc && (
                    <div className="description mb-2">Desc: {i.desc}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
