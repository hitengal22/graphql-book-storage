import { useState, useCallback } from 'react'
import { Card, List, Layout, Button, Flex, Modal, Image } from 'antd'
import AddBook from './AddBooks'
import UpdateBook from './UpdateBook'

export default function ListBooks({ loading, books, refetch }) {
	const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editId, setEditId] = useState(null)

	const { Meta } = Card
	const showModal = useCallback(() => {
		setOpen(true)
	}, [setOpen])

  const showEditModal = useCallback((id) => {
    console.log("Changge  s", id)
    setOpenEdit(true)
    setEditId(id)
  }, [setOpenEdit])

	const handleCancel = useCallback(() => {
		setOpen(false)
	}, [setOpen])

  const handleEditCancelButton = useCallback(() => {
    setOpenEdit(false)
    setEditId(null)
  }, [setOpenEdit])

	return (
		<>
			<Flex stye={{ width: '100%' }} justify={`space-between`} align={`center`}>
				<h2>Books</h2>
				<Button type='primary' onClick={showModal}>
					Add Books
				</Button>
			</Flex>
			<Layout
				style={{
					padding: '10px',
				}}
			>
				<List
					grid={{
						gutter: 16,
						column: 4,
					}}
					loading={loading}
					dataSource={books}
					renderItem={(item) => (
						<List.Item style={{ height: 300 }}>
							<Card
								size={`small`}
								style={{
									height: 300,
								}}
							>
								<Meta
									title={
										<Flex justify="space-between">
                      <div>
  											<span>{item?.name}</span>
  											<br />
  											<span
  												style={{
  													fontWeight: 300,
  													fontSize: '14px',
  													color: 'rgba(183,183,181,1)',
  												}}
  											>
  												{item?.author?.name} | {item?.genre}
  											</span>
                      </div>
                      <div>
                        <Button type="link" onClick={() => {
                          showEditModal(item?._id)
                        }}>
                          Edit
                        </Button>
                      </div>
										</Flex>
									}
									description={
										<>
											<Flex align='center' gap='middle'>
												<Flex align='center'>
													<Image src={item?.image} />
												</Flex>
												<span>{item?.description}</span>
											</Flex>
										</>
									}
								/>
							</Card>
						</List.Item>
					)}
				/>
			</Layout>

			<Modal open={open} title={`Add Book`} onCancel={handleCancel} footer={null}>
				<AddBook onCloseModal={handleCancel} refetch={refetch} />
			</Modal>

      <Modal open={openEdit} title={`Update Book`} onCancel={handleEditCancelButton} footer={null}>
				<UpdateBook onCloseModal={handleEditCancelButton} id={editId} refetch={refetch} />
			</Modal>
		</>
	)
}
