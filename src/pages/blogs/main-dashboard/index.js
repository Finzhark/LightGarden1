import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { getArticles} from "../../../store/slices/blogs/slices"
import { getLikedArticles } from "../../../store/slices/blogs/myLikedArticles/slices"
import RenderMyBlogCards from "./listMyArticles"
import RenderLikedBlogCards from "../blogs-components/userLikedBlog"
import Pagination from "../blogs-components/pagination"
import Footer from "../../../components/footer"
import { useNavigate } from "react-router-dom"


export default function DashboardPage () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { username } = useSelector(state => {
        return {
			username : state.auth.username
        }
    })

    const { filteredArticles, likedArticles, currentLikedPages } = useSelector(state => {
        return {
            filteredArticles : state.blogs.filteredArticles,
            likedArticles : state.liked.likedArticles,
            currentLikedPages : state.liked.currentPage,
        }
    })

    const onLikedArticles = (type) => {
        dispatch(getLikedArticles({ 
            page : type === "prev" ? currentLikedPages - 1 : currentLikedPages + 1, 
        }))
    }

    const writeIcon = <FontAwesomeIcon icon={faPenToSquare} />

    useEffect(() => {
        dispatch(getLikedArticles({
            page : 1
        }))
        dispatch(getArticles({
            id_cat : "", 
            page : 1,
            sort : "ASC"
        }))
    }, [])
// flex flex-col flex-wrap gap-5 pt-10 w-full
    return (
        <div className="flex flex-col flex-wrap gap-5 pt-10 w-full mt-10">
            
            <div className="text-bold text-[40pt] text-center">Hello, {username}
            </div>
            <div className="text-center text-[18pt]">This is your dashboard page.</div>

            <div className="flex gap-5 pt-10 w-full mt-2">
            {/* Sisi kiri */}
            <div class=" flex flex-col gap-5 justify-between py-20 w-1/3 bg-slate-200 rounded-lg">
                <a className="text-2xl font-bold place-self-center flex-wrap]">My Favorite Blogs</a>
                <div className="flex justify-between place-self-center mt-5 -mb-5">
                    <Pagination
                        onChangePagination={onLikedArticles}
                        disabledPrev={currentLikedPages === 1}
                        disabledNext={likedArticles.length == 0}
                    />
                </div>

                
                <div className="grid flex-grow card w-fit h-[460px] carousel carousel-vertical rounded-box place-items-start flex-wrap gap-5 justify-between my-5 mx-5">
                    {
                        likedArticles.length == 0 
                        ? 
                            <div className="h-full w-full text-center">
                                <a 
                                    className="text-[30px] w-full"
                                    href="/"
                                >
                                    Oops, you haven't liked any articles. Your favorite articles will appear here after you like an or some articles.
                                </a>
                            </div>
                        :   
                        <RenderLikedBlogCards likedArticles={likedArticles}/>
                    }
                </div>
                        
            </div>
            
            {/* Sisi kanan */}
            <div className=" flex flex-col gap-5 justify-between bg-slate-200 rounded-lg py-20 w-2/3">
                <a className="font-bold text-2xl text-center">My articles blog </a>
                {
                filteredArticles.length == 0 
                ? 
                    <div className="flex flex-col w-full">
                        <a 
                            className="btn btn-ghost btn-lg justify-center place-self-center"
                            onClick={() =>{navigate("/post-blog")}}
                        >
                            Ready to write a blog?
                        </a>
                    </div>
                :   
                    <div className="overflow-x-auto">
                    <a
                        onClick={() =>{navigate("/post-blog")}}
                        className="text-[14pt] btn-ghost hover:btn-ghost cursor-pointer"
                    >
                        {writeIcon} I'm ready to write a blog 
                    </a> 
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Thumbnail</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                <RenderMyBlogCards filteredArticles={filteredArticles}/>
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            </div>
            <Footer />
        </div>
    )
}
