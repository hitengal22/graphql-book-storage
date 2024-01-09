import { useEffect } from 'react';
import { Form, Input, Space, Button } from 'antd';
import { gql, useMutation } from '@apollo/client';

export default function AddAuthor({ onCloseModal, refetch }) {
  const ADD_FORM = gql`
    mutation AddAuthor($name: String!, $age: String!, $rating: String!) {
      addAuthor(name: $name, age: $age, rating: $rating) {
        name
        age
        rating
      }
    }
  `;

  const [addAuthor, { data, loading, error, reset }] = useMutation(ADD_FORM);

  const [form] = Form.useForm();

  const tailLayout = {
    wrapperCol: { offset: 4, span: 14 }
  };

  const onFinish = (values) => {
    console.log(values);
    addAuthor({ variables: values });
    form.resetFields();
    reset();
    onCloseModal();
    refetch();
  };

  useEffect(() => {
    if (error) {
      reset();
    }
  }, [error]);

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        size={`default`}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label={`Name`} name={`name`} rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label={`Age`} name={`age`} rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label={`Rating`} name={`rating`} rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
