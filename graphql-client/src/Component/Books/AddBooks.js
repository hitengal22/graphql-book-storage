import { useCallback, useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Form, Input, Select, Space, Button } from 'antd';

export default function AddBook({ onCloseModal, refetch }) {
  const [form] = Form.useForm();
  const [authorsData, setAuthorsData] = useState([]);
  const { TextArea } = Input;

  const GET_AUTHORS = gql`
    query GetAuthor {
      authors {
        _id
        name
      }
    }
  `;

  const ADD_BOOK = gql`
    mutation AddBook(
      $name: String!
      $image: String!
      $description: String!
      $genre: String!
      $authorId: ID!
    ) {
      addBook(
        name: $name
        image: $image
        description: $description
        genre: $genre
        authorId: $authorId
      ) {
        _id
        name
      }
    }
  `;

  const [addBook, { loading: bookLoading, data: bookData, reset }] = useMutation(ADD_BOOK);
  const { loading: authorLoading, data: authors, refetch: refetchAuthors } = useQuery(GET_AUTHORS);
  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 }
  };

  const onFinish = (values) => {
    form.resetFields();
    addBook({ variables: values });
    refetchAuthors();
    refetch();
    reset();
    onCloseModal();
  };

  useEffect(() => {
    console.log('AUTHORS', authors?.authors);
    if (authors?.authors?.length > 0) {
      let authorsList = [];
      authors?.authors?.forEach((item) => {
        const obj = {
          value: item?._id,
          label: item?.name
        };
        authorsList.push(obj);
      });

      setAuthorsData(authorsList);
    }
  }, [authors]);

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      size={`default`}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item label={`Name`} name={`name`} rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label={`Image`} name={`image`} rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label={`Author`} name={`authorId`} rules={[{ required: true }]}>
        <Select options={authorsData || []} />
      </Form.Item>

      <Form.Item label={`Description`} name={`description`} rules={[{ required: true }]}>
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label={`Genre`} name={`genre`} rules={[{ required: true }]}>
        <Select
          options={[
            {
              value: 'Fantacy',
              label: 'Fantacy'
            },
            {
              value: 'Sci-Fi',
              label: 'Sci-Fi'
            },
            {
              value: 'Fiction',
              label: 'Fiction'
            },
            {
              value: 'Horror',
              label: 'Horror'
            },
            {
              value: 'Thriller',
              label: 'Thriller'
            }
          ]}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit" loading={bookLoading}>
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
