import { useQuery, gql } from '@apollo/client'
import ListBooks from './Component/Books/ListBooks'
import ListAuthors from './Component/Author/ListAuthor'

function App() {
	const GET_BOOKS = gql`
		query GetBooks {
			books {
				_id
				name
				description
				image
				genre
				author {
					name
				}
			}
			authors {
				name
				age
				rating
			}
		}
	`
	const { loading, data, refetch } = useQuery(GET_BOOKS)
	return (
		<div
			style={{
				margin: '40px',
				padding: '10px',
			}}
		>
			<ListBooks loading={loading} refetch={refetch} books={data?.books || []} />
			<ListAuthors loading={loading} refetch={refetch} authors={data?.authors || []} />
		</div>
	)
}

export default App
