import { useState, useCallback, useEffect } from 'react'
import { Flex, Button, Layout, List, Card, Modal, Spin, message, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation, gql } from '@apollo/client';
import AuthorModal from './AuthorModal'

export default function ListAuthors({ loading, authors, refetch }) {
	const DELETE_AUTHOR = gql`
		mutation DeleteAuthor($id: ID!) {
			deleteAuthor(id: $id){
				name
			}
		}
	`

	const { Meta } = Card
	const [messageApi, contextHolder] = message.useMessage();
	const [open, setOpen] = useState(false)
	const [editId, setEditId] = useState(null);
	const [reset, setReset] = useState(false);
	const [deleteAuthor, { loading: deleteAuthorLoading, data: deleteAuthorData, error: deleteAuthorError }] = useMutation(DELETE_AUTHOR);

	const showModal = () => {
		setOpen(true);
		setReset(true);
	}

	const handleCancel = () => {
		setOpen(false)
		if (editId) {
			setEditId(null);
		}
	}

	const handleEditAuthor = useCallback((id) => {
		setEditId(id);
		setOpen(true);
		setReset(true);
	}, [setEditId]);

	useEffect(() => {
		if (deleteAuthorData && !deleteAuthorLoading && !deleteAuthorError) {
			refetch()
			messageApi.open({
				type: 'success',
				content: 'Author Deleted Successfuly'
			})
		}
	}, [deleteAuthorData, deleteAuthorLoading, deleteAuthorError])

	return (
		<>
			{contextHolder}
			<Spin size="large" spinning={deleteAuthorLoading} fullscreen />
			<Flex stye={{ width: '100%' }} justify={`space-between`} align={`center`}>
				<h2>Author</h2>
				<Button type='primary' onClick={showModal}>
					Add Author
				</Button>
			</Flex>
			<Layout style={{ padding: '10px' }}>
				<List
					grid={{
						gutter: 16,
						column: 4,
					}}
					loading={loading}
					dataSource={authors}
					renderItem={(item) => (
						<List.Item>
							<Card>
								<Meta
									title={
										<Flex justify='space-between'>
												<div>
													{item?.name}
												</div>
												<div>
													<Popconfirm
														title="Delete the author"
														description="Are you sure to delete this author?"
														onConfirm={() => {
															deleteAuthor({ variables: { id: item?._id } })
														}}
														okText="Yes"
	 													cancelText="No"
													>
														<Button type={`link`}>
															<DeleteOutlined style={{ color: 'red' }} />
														</Button>
													</Popconfirm>
													<Button type={`link`} onClick={() => {
														handleEditAuthor(item?._id)
													}} >
														Edit
													</Button>
												</div>
										</Flex>
									}
								/>
								<p>Age: {item?.age}</p>
								<p>Rating: {item?.rating}</p>
							</Card>
						</List.Item>
					)}
				></List>
			</Layout>
			<Modal open={open} onCancel={handleCancel} title={`${editId ? 'Edit Author' : 'Add Author'}`} footer={null} destroyOnClose>
				<AuthorModal  onCloseModal={handleCancel} refetch={refetch} id={editId} reset={reset} setReset={setReset} />
			</Modal>
		</>
	)
}
