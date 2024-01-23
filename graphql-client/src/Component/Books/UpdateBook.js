import { useEffect, useState } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Form, Input, Select, Space, Button } from 'antd'
export default function UpdateBook({ onCloseModal, id, refetch }) {
	const [authorsData, setAuthorsData] = useState([])
	const [bookData, setBookData] = useState([])
	const { TextArea } = Input
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
				_id
				name
			}
		}
	`

	const UPDATE_BOOK_DETAIL = gql`
		mutation UpdateBookDetail(
			$id: ID!
			$name: String!
			$image: String!
			$description: String!
			$genre: String!
			$authorId: ID!
		) {
			updateBook(
				id: $id
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
	`

	const [GetBookDetails, { data }] = useLazyQuery(GET_BOOK_DETAIL)
	const [updateBook, { loading: submitLoading, reset }] = useMutation(UPDATE_BOOK_DETAIL)

	const tailLayout = {
		wrapperCol: { offset: 6, span: 16 },
	}

	const onFinish = (values) => {
		form.resetFields()
		values = { ...values, id }
		updateBook({ variables: values })
		refetch()
		reset()
		onCloseModal()
	}

	useEffect(() => {
		GetBookDetails({
			variables: {
				id,
			},
		})
	}, [id])

	useEffect(() => {
		if (data?.authors?.length > 0) {
			let authorsList = []
			data?.authors?.forEach((item) => {
				const obj = {
					value: item?._id,
					label: item?.name,
				}
				authorsList.push(obj)
			})
			setAuthorsData(authorsList)
		}
	}, [data?.authors])

	useEffect(() => {
		if (data?.book) {
			let fields = []
			for (var bookKey in data?.book) {
				if (data?.book.hasOwnProperty(bookKey)) {
					const obj = {
						name: [`${bookKey}`],
						value: data?.book[bookKey],
					}
					fields.push(obj)
				}
			}
			setBookData(fields)
		}
	}, [data?.book])

	return (
		<Form
			labelCol={{ span: 6 }}
			wrapperCol={{ span: 16 }}
			size={`default`}
			form={form}
			fields={bookData}
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
					<Button type='primary' htmlType='submit' loading={submitLoading}>
						Submit
					</Button>
				</Space>
			</Form.Item>
		</Form>
	)
}
