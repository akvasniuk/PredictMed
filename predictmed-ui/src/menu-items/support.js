import {
  ChromeOutlined,
  QuestionOutlined,
  EditOutlined,
} from "@ant-design/icons";

const icons = {
  ChromeOutlined,
  QuestionOutlined,
  EditOutlined,
};

const support = {
  id: "support",
  title: "Support",
  type: "group",
  children: [
    {
      id: "tech-support",
      title: "Technical Support",
      type: "item",
      url: "/support",
      icon: icons.QuestionOutlined
    },
    {
      id: "feedback",
      title: "Feedback",
      type: "item",
      url: "/feedback",
      icon: icons.EditOutlined,
    },
  ],
};

export default support;
