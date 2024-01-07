import { useQuery, gql } from '@apollo/client';
import { Card, List, Layout } from 'antd';
export default function ListBooks () {
  const GET_BOOKS = gql`
    query GetBooks{
      books{
        name
        description
        image
        gener
      }
      authors{
        name
        age
        rating
      }
    }
  `
  const { loading, data } = useQuery(GET_BOOKS);
  return (
    <div
      style={{
        margin: '40px',
        padding: '10px'
      }}
    >
      <Layout
        style={{
          padding: '10px'
        }}
      >
        <List
          grid={{
            gutter: 16,
            column: 4
          }}
          loading={loading}
          dataSource={data?.books}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.name}>{item.description}</Card>
            </List.Item>
          )}
        ></List>
      </Layout>
      <Layout style={{ padding: '10px' }}>
        <List
          grid={{
            gutter: 16,
            column: 4
          }}
          loading={loading}
          dataSource={data?.author}
          renderItem={(item) => (
            <List.Item>
              <Card></Card>
            </List.Item>
          )}
        >
        </List>
      </Layout>
    </div>
  )
}
