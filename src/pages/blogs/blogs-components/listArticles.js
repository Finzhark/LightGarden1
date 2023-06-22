import { useDispatch } from "react-redux"
import { likeArticle } from "../../../store/slices/blogs/slices"
import dateFormat from 'dateformat'
import { FcLike } from "react-icons/fc"
import { BsPersonCircle } from "react-icons/bs"


function ExploreAllBlogs ({
    title = "",
    content = "",
    thumbnail = "",
    BlogId = "",
    author ="", 
    createdAt ="",
    category = "",
    userProfilePicture = "",
}) {
    const dispatch = useDispatch()
    const likeButton = ()=>{
        dispatch(likeArticle({BlogId}))
    }
    const id = localStorage.getItem("token")
    return (

        <div className="card card-side w-[99%] border border-slate-300 rounded-xl drop-shadow-sm hover:bg-slate-200 hover:border-gray-300">
            
            <img 
                src={process.env.REACT_APP_IMAGE_URL + thumbnail} 
                className="rounded-lg w-[30%] object-cover mx-3 my-3" 
            />
            <div className="card-body">
                <div className="badge badge-outline rounded-md">
                    {category}
                </div>
                <h2 className="card-title text-2xl font-bold">{title}</h2>
                <h5>
                <div className="avatar">
                    <div className="w-5 rounded-xl mr-3">
                        <img src={userProfilePicture
                            ? `${process.env.REACT_APP_IMAGE_URL + userProfilePicture}`
                            : <BsPersonCircle/>
                            }
                            alt="pic"
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


export default function RenderExploreAllBlogs ({
    articles = [],
}) {
    return articles.map((article, index) => {
        return (
            <ExploreAllBlogs key={article.id}
                title={article.title}
                content={article.content}
                thumbnail={article.imageURL}
                BlogId = {article.id}
                author = {article.User.username}
                createdAt = {article.createdAt}
                category = {article?.Category?.name}
                userProfilePicture={article?.User.imgProfile}
            />
        )
    })
}