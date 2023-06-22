import { useDispatch } from "react-redux"
import { likeArticle } from "../../../store/slices/blogs/slices"
import dateFormat from 'dateformat'
import { FcLike } from "react-icons/fc"


function NewBlog ({
    title = "",
    content = "",
    thumbnail = "",
    BlogId = "",
    author ="", 
    createdAt ="",
    category = "",
    userProfile = "",
}) {
    const dispatch = useDispatch()
    const likeButton = ()=>{
        dispatch(likeArticle({BlogId}))
    }
    const id = localStorage.getItem("token")
    return (

        <div className="card card-side bg-base-100 shadow-xl w-[100%]">
            <figure className="object-scale-down w-[30%] p-5">
                <img 
                    src={process.env.REACT_APP_IMAGE_URL + thumbnail} 
                    className="rounded-lg" 
                />
            </figure>
            <div className="card-body">
                <div className="badge badge-outline rounded-md">
                    {category}
                </div>
                <h2 className="card-title">{title}</h2>
                <h5>
                <div className="avatar">
                    <div className="w-5 rounded-xl">
                        <img src={(!{userProfile}) ? "by" : {userProfile}}
                        />
                    </div>
                </div>
                    {author} | { dateFormat(createdAt, "dd mmmm yyyy")}
                </h5>
                <p>{content}</p>
                
                <div className="card-actions justify-end">
                    <div 
                        className="tooltip" 
                        data-tip={!id ? "Please login first" : "Like me please"}
                    >
                        <button 
                            className="btn btn-ghost"
                            disabled={!id}
                            onClick={likeButton}
                        >
                            <FcLike className="text-red-500 text-2xl" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default function RenderNewBlog ({
    articles = [],
}) {
    return articles.map((article, index) => {
        return (
            <NewBlog key={article.id}
                title={article.title}
                content={article.content}
                thumbnail={article.imageURL}
                BlogId = {article.id}
                author = {article.User.username}
                createdAt = {article.createdAt}
                category = {article?.Category?.name}
                userProfile = {article?.User?.imgProfile}
                // total_fav={article?.total_fav}
            />
        )
    })
}