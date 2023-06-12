import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const Popup = ({ isModalOpen, setIsModalOpen, popupData, setData, data }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
      form.setFieldsValue(popupData);
    }
  }, [isModalOpen, popupData, form]);

  const handleOk = () => {
    isFormValid();

    form
      .validateFields()
      .then((values) => {
        // console.log(values);
        const updatedData = data.map((card) =>
          card.id === popupData.id ? { ...card, ...values } : card
        );
        setData(updatedData);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const validateMessages = {
    required: "This field is required",
  };

  const isFormValid = () => {
    form
      .validateFields()
      .then((values) => {
        // console.log("Form values:", values);
        form.validateFields();
      })
      .catch((error) => {
        console.log("Form validation error:", error);
      });
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} validateMessages={validateMessages}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="website"
            label="Website URL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Popup;
