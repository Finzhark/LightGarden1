import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteBlog, getArticles } from "../../../store/slices/blogs/slices"

function MyBlogCard ({
    title = "",
    content = "",
    thumbnail = "",
    BlogId = "",
    category = ""
}) {
    const { id} = useSelector(state => {
        return {
            id : state.auth.id
        }
    })
    const dispatch = useDispatch()
    const [deleting,deleteConfirm] = useState(false)

    const onButtonDelete = ()=>{
        dispatch(deleteBlog(BlogId))
        dispatch(getArticles({
            id_cat : "", 
            page : 1,
            sort : "ASC"
        }))
    }
    console.log(id)

    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={process.env.REACT_APP_IMAGE_URL + thumbnail} />
                    </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="font-bold">{title}</div>
            </td>
            
            <td className="break-all w-1/2 ">
                {content}
            </td>
            
            <td>{category}</td>
            
            <th className="break-all w-[10%]" >
                <button 
                    className={`btn btn-outline btn-error btn-xs  ${deleting ? "hidden" : ""}`} 
                    onClick={()=>deleteConfirm(true)}
                >
                    Delete
                </button>
                <div className={`${!deleting ? "hidden" : ""}`} >
                    <p>
                        Delete this Blog?    
                    </p>
                    <br/>
                    <button 
                        className="btn btn-error btn-xs pr-2"
                        onClick={()=>{
                            onButtonDelete(BlogId)
                            deleteConfirm(false)
                        }}
                    >
                        Confirm
                    </button>

                    <button 
                        className="link link-hover pl-2"
                        onClick={()=>deleteConfirm(false)}
                    >
                        Cancel
                    </button>
                </div>
            </th>
        </tr>
    )
}

export default function RenderMyBlogCards ({
    filteredArticles = [],
}) {
    return filteredArticles.map((filteredArticle, index) => {
        return (
            <MyBlogCard key={filteredArticle.id}
                title={filteredArticle.title}
                content={filteredArticle.content}
                thumbnail={filteredArticle.imageURL}
                BlogId = {filteredArticle.id}
                category = {filteredArticle?.Category?.name}
            />
        )
    })
}