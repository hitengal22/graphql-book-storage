import { gql, useQuery } from '@apollo/client';
import { Form, Input, Select, Space, Button, } from 'antd'
export default function UpdateBook({ onCloseModal, id, refetch }) {
  console.log("id",id)
  const { TextArea } =  Input
  const [form] = Form.useForm()

  const GET_BOOK_DETAIL = gql`
    query GetBookDetails($id: ID) {
      book(id: $id) {
        _id
        name
        image
        description
        genre
        authorId
      }
      authors {
        _id,
        name
      }
    }
  `

  const { data: bookDetail } = useQuery(GET_BOOK_DETAIL, {
    variables: { id }
  });
  console.log("bookDetail", bookDetail);

  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  }

  const onFinish = (values) => {
    form.resetFields()
    // addBook({ variables: values })
    // refetchAuthors()
    // refetch()
    // reset()
    // onCloseModal()
  }


  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      size={`default`}
      form={form}
      onFinish={onFinish}
    >
    <Form.Item label={`Name`} name={`name`} rules={[{ required: true }]}>
      <Input  />
    </Form.Item>

    <Form.Item label={`Image`} name={`image`} rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item label={`Author`} name={`authorId`} rules={[{ required: true }]}>
      <Select options={[]} />
    </Form.Item>

    <Form.Item label={`Description`} name={`description`} rules={[{ required: true }]}>
      <TextArea rows={3} />
    </Form.Item>

    <Form.Item label={`Genre`} name={`genre`} rules={[{ required: true }]}>
      <Select
        options={[
          {
            value: 'Fantacy',
            label: 'Fantacy',
          },
          {
            value: 'Sci-Fi',
            label: 'Sci-Fi',
          },
          {
            value: 'Fiction',
            label: 'Fiction',
          },
          {
            value: 'Horror',
            label: 'Horror',
          },
          {
            value: 'Thriller',
            label: 'Thriller',
          },
        ]}
      />
    </Form.Item>

    <Form.Item {...tailLayout}>
      <Space>
        <Button type='primary' htmlType='submit' loading={false}>
          Submit
        </Button>
      </Space>
    </Form.Item>
    </Form>
  )
}
