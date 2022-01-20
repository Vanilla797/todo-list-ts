import React, { FC, useState } from "react";
import { Modal, Input, Form } from "antd";
import { ModalFormProps } from "../interface";

const ModalForm: FC<ModalFormProps> = (props) => {
  const { visible, onClose, addTodo, modalTitle, todoId, updateText } = props;
  const [itemId, setItemId] = useState(1);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const text: string = form.getFieldValue("content");
    if (modalTitle === "Add") {
      addTodo(itemId, text, false);
      setItemId((itemId) => itemId + 1);
    }
    if (modalTitle === "Edit") {
      updateText(todoId, text);
    }
    form.setFieldsValue({ content: "" });
    onClose();
  };

  return (
    <Modal
      title={modalTitle}
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Submit">
      <Form form={form}>
        <Form.Item name="content" label="Text">
          <Input placeholder="input" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
