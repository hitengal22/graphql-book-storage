import { useState } from 'react'
import { Flex, Button, Layout, List, Card, Modal } from 'antd'
import AddAuthor from './AddAuthor'
export default function ListAuthors({ loading, authors, refetch }) {
	const [open, setOpen] = useState(false)

	const showModal = () => {
		setOpen(true)
	}

	const handleCancel = () => {
		setOpen(false)
	}

	return (
		<>
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
							<Card title={item?.name}>
								<p>Age: {item?.age}</p>
								<p>Rating: {item?.rating}</p>
							</Card>
						</List.Item>
					)}
				></List>
			</Layout>
			<Modal open={open} title={`Add Author`} footer={[]}>
				<AddAuthor onCloseModal={handleCancel} refetch={refetch} />
			</Modal>
		</>
	)
}
