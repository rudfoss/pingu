import { useParams } from "react-router"

export interface IPostProps {
  postId?: string
}

export const Post = ({ postId }: IPostProps) => {
  if (!postId) {
    return (
      <section>
        <h1>Post id not specified</h1>
      </section>
    )
  }

  return (
    <section>
      <h1>Post {postId}</h1>
      <p>This is post {postId}</p>
    </section>
  )
}

export const PostRouter = () => {
  const { postId } = useParams<{ postId?: string }>()
  return <Post postId={postId} />
}

export default PostRouter
