import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: {}, isLoading: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedData = {
      imageUrl: data.image_url,
      title: data.title,
      content: data.content,
      avatarUrl: data.avatar_url,
      author: data.author,
      id: data.id,
      topic: data.topic,
    }
    this.setState({blogData: updatedData, isLoading: false})
  }

  renderBlockItemDetails = () => {
    const {blogData} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div className="blog-info">
        <h1 className="title">{title}</h1>
        <div className="author-details">
          <img src={avatarUrl} className="avatar-image" alt={author} />
          <p className="author-name">{author}</p>
        </div>
        <img src={imageUrl} className="blog-image" alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="blog-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          this.renderBlockItemDetails()
        )}
      </div>
    )
  }
}
export default BlogItemDetails
