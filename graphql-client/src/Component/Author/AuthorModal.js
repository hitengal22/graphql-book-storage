import { useEffect, useState } from 'react'
import { Form, Input, Space, Button, Spin, message } from 'antd'
import { gql, useMutation, useLazyQuery } from '@apollo/client'

export default function AuthorModal({ onCloseModal, refetch, id, reset: resetState, setReset }) {
	const ADD_FORM = gql`
		mutation AddAuthor($name: String!, $age: String!, $rating: String!) {
			addAuthor(name: $name, age: $age, rating: $rating) {
				name
				age
				rating
			}
		}
	`

	const GET_AUTHOR = gql`
		query GetAuthor($id: ID!) {
			author(id: $id) {
				_id
				name
				name
				age
				rating
			}
		}
	`

	const UPDATE_AUTHOR = gql`
		mutation UpdateAuthor($id: ID!, $name: String!, $age: String!, $rating: String!) {
			updateAuthor(id: $id, name: $name, age: $age, rating: $rating) {
				_id
			}
		}
	`

	const [addAuthor, { loading, error, reset }] = useMutation(ADD_FORM)
	const [updateAuthor, { loading: updateAuthorLoading, error: updateAuthorError }] =
		useMutation(UPDATE_AUTHOR)
	const [getAuthor, { data: authorDataQuery, loading: authorLoading }] = useLazyQuery(GET_AUTHOR)
	const [authorData, setAuthorData] = useState([])

	const [messageApi, contextHolder] = message.useMessage()

	const [form] = Form.useForm()

	const tailLayout = {
		wrapperCol: { offset: 4, span: 14 },
	}

	const onFinish = (values) => {
		if (id) {
			values = { ...values, id }
			updateAuthor({ variables: values })
		} else {
			addAuthor({ variables: values })
		}
		messageApi.open({
			type: 'success',
			content: id ? 'Author Updates Successfuly' : 'Author Added Successfuly',
		})
		form.resetFields()
		reset()
		onCloseModal()
		refetch()
	}

	useEffect(() => {
		if (id) {
			getAuthor({ variables: { id } })
		} else {
			setAuthorData([])
		}
	}, [id])

	useEffect(() => {
		if (resetState) {
			setAuthorData([])
			setReset(false)
		}
	}, [resetState])

	useEffect(() => {
		if (authorDataQuery?.author) {
			let fields = []
			for (var authorKey in authorDataQuery?.author) {
				if (authorDataQuery?.author.hasOwnProperty(authorKey)) {
					const obj = {
						name: [`${authorKey}`],
						value: authorDataQuery?.author[authorKey],
					}
					fields.push(obj)
				}
			}
			setAuthorData(fields)
		}
	}, [authorDataQuery])

	useEffect(() => {
		if (error || updateAuthorError) {
			messageApi.open({
				type: 'error',
				content: error?.message || updateAuthorError?.message,
			})
			reset()
		}
	}, [error, updateAuthorError])

	return (
		<>
			{contextHolder}
			<Spin size={'large'} fullscreen={true} spinning={authorLoading || updateAuthorLoading} />
			<Form
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				size={`default`}
				fields={authorData}
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
						<Button type='primary' htmlType='submit' loading={loading}>
							Submit
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	)
}
