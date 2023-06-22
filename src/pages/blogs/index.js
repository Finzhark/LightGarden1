import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getArticles} from "../../store/slices/blogs/slices"
import { getCategories } from "../../store/slices/blogs/getCategory/slices"
import { getFavBlogs } from "../../store/slices/blogs/favBlogs/slices"
import { getLikedArticles } from "../../store/slices/blogs/myLikedArticles/slices"
import RenderFavoriteBlogs from "./blogs-components/favoriteBlogs"
import RenderCategoryBlogs from "./blogs-components/categoryBlogs"
import RenderExploreAllBlogs from "./blogs-components/listArticles"
import RenderTop10Articles from "./blogs-components/top10Articles"
import Pagination from "./blogs-components/pagination"
import Footer from "../../components/footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpAZ, faArrowDownZA  } from "@fortawesome/free-solid-svg-icons"
import RenderCarouselBanner from "./blogs-components/newBlogs"
import RenderNewBlogs from "./blogs-components/newBlogs"
import RenderSidebarCategories from "./blogs-components/sidebarCategory"


function LandingPage () {
    const dispatch = useDispatch()
    const { isLogoutLoading, loading, loadingTop10, currentPage, totalPage, articles, username, categories ,favorites, top10_fav, sideCat, newBlog} = useSelector(state => {
        return {
            isLogoutLoading : state.auth.isLogoutLoading,
            loading : state.blogs.isLoading,
            articles : state.blogs.articles,
            currentPage : state.blogs.currentPage,
            totalPage : state.blogs.totalPage,
            username : state.auth.username,
            categories : state.category.categories,
            favorites : state.favorites.favorites,
            top10_fav :state.favorites.top10,
            loadingTop10 : state.favorites.isLoading,
            sideCat : state.blogs.sideCat,
            newBlog : state.blogs.newBlog
        }
    })

    const [valueCategory, setValue] = useState({id:"",name:""});
    
    useEffect(() => {
        dispatch(getArticles({
            id_cat : "", 
            page : 1,
            sort : "DESC",
            username : {username}
        }))
        dispatch(getCategories())
        dispatch(getFavBlogs(" "))
    }, [])
    
    
    const onChangePagination = (type) => {
        dispatch(getArticles({ 
            id_cat : valueCategory.id , 
            page : type === "prev" ? currentPage - 1 : currentPage + 1, 
            sort : "DESC" 
        }))
    }    
    
    const handleChange = (event) => {
        setValue({
            id:event.target.selectedOptions[0].className, 
            name:event.target.value 
        })
        dispatch(getArticles({
            id_cat : event.target.selectedOptions[0].className,
            page : 1,
            sort : "DESC" 
        }))
        dispatch(getLikedArticles({
            page : 1
        }))
        dispatch(getFavBlogs({
            cat_name:event.target.value
        }))
    }
    
    const sortingChange = (e)=>{
        e.target.checked 
        ? dispatch(getArticles({
                id_cat : "", 
                page : 1,
                sort : "ASC",
            }))
        : dispatch(getArticles({
                id_cat : "", 
                page : 1,
                sort : "DESC",
            }))
    }
    if(isLogoutLoading) return (
        <div className="h-screen w-screen flex flex-col align-middle">
            <span className="loading loading-dots loading-lg"/>
        </div>
    )

    return (
        <div>
            <div className="flex justify-center items-center h-48 ">
                <div className="text-center">
                    <h1 className="text-[28pt] font-bold">Welcome to Light Garden</h1>
                    <h3 className="text-[18pt]" >"Explore the Garden of Shared Stories"</h3>
                </div>
            </div>
            <div className="flex justify-center mb-10">
                <div className="border rounded-lg border-black w-2/3 mb-5"/>
            </div>

            <RenderFavoriteBlogs favorites={favorites}/>
            
            <div className="flex flex-col flex-wrap gap-5 justify-between py-20">
                <h2 className="text-2xl font-bold place-self-center flex-wrap">
                    Explore Articles
                </h2>
                <div className="flex flex-col place-self-center w-[35vw] flex-wrap">
                    <div className="flex flex-row w-full h-auto gap-5 justify-center">
                        <div className="flex flex-col">
                            <label className="swap">
                                <input 
                                    type="checkbox" 
                                    onClick={sortingChange}
                                />
                                <div className="swap-on text-bold btn bg-slate-200">Sort A to Z</div>
                                <div className="swap-off text-bold btn bg-slate-200">Sort Z to A</div>
                            </label>
                        </div>
                        <select 
                            value={valueCategory?.name} 
                            onChange={handleChange}
                            className="select select-bordered w-full max-w-xs"
                        >
                            <option selected value="allCategory">All Category</option>
                            <RenderCategoryBlogs categories={categories} />
                        </select>
                    </div>
                    <div className="flex justify-between place-self-center mt-5 -mb-5">
                        <Pagination 
                            onChangePagination={onChangePagination}
                            disabledPrev={currentPage === 1}
                            disabledNext={currentPage >= totalPage}
                        />
                    </div>
                </div>
                <div class="flex flex-col w-full lg:flex-row h-full mt-8 pb-2 ">                
                    
                    <div class="bg-slate-200 rounded-lg flex flex-grow-0 card w-1/3 carousel carousel-vertical place-items-start flex-wrap gap-5 py-5 mt-5 h-fit">
                        
                        <a className="text-bold text-[18pt]">
                            {
                                valueCategory?.name == "allCategory" || valueCategory?.name == "" 
                                ? <RenderSidebarCategories/>
                                : `Top 10 Popular Articles of ${valueCategory?.name}`
                            } 
                        </a>
                        {loadingTop10
                            ?   <div>
                                    <span className="loading loading-spinner loading-md"></span>
                                </div>
                            :   <RenderTop10Articles top10_fav={top10_fav}/>
                        }
                        
                    </div>

                    <div class="mx-5"/> 
                    
                    <div class="grid flex-grow card w-[100%] h-full carousel carousel-vertical rounded-box place-items-start flex-wrap gap-5 justify-between py-5">
                     {loading 
                     ? 
                         <div className="h-screen w-screen flex flex-col align-middle">
                             <span className="loading loading-dots loading-lg"></span>
                         </div>
                     :
                        <RenderExploreAllBlogs articles={articles} />
                     }

                                        <div className="flex justify-between place-self-center mt-5 -mb-5">
                        <Pagination 
                            onChangePagination={onChangePagination}
                            disabledPrev={currentPage === 1}
                            disabledNext={currentPage >= totalPage}
                        />
                    </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
        
    )
}

export default LandingPage