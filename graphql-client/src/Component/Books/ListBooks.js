import { useState, useCallback } from 'react';
import { Card, List, Layout, Button, Flex, Modal, Row, Col,  Image, Typography } from 'antd';
import AddBook from './AddBooks';

export default function ListBooks({ loading, books, refetch }) {
  const [open, setOpen] = useState(false);
  const { Meta } = Card
  const showModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <Flex stye={{ width: '100%' }} justify={`space-between`} align={`center`}>
        <h2>Books</h2>
        <Button type="primary" onClick={showModal}>
          Add Books
        </Button>
      </Flex>
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
          dataSource={books}
          renderItem={(item) => (
            <List.Item>
              <Card
                width={`auto`}
                height={300}
                cover={
                  <Image src={item.image} alt="Book Image" height={300} width={`auto`} preview={false} />
                }
              >
                <Meta
                  title={(
                    <>
                      <span>{item?.name}</span><br />
                      <span>{item?.author?.name}</span>
                    </>
                  )}
                  description={item?.description}
                />
              </Card>
            </List.Item>
          )}
        />
      </Layout>

      <Modal open={open} title={`Add Book`} onCancel={handleCancel} footer={null}>
        <AddBook onCloseModal={handleCancel} refetch={refetch} />
      </Modal>
    </>
  );
}
