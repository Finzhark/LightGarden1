import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import {useDropzone} from 'react-dropzone';
import { Formik, Form, Field, ErrorMessage } from "formik";
import {publishBlogSchema} from "../../store/slices/auth/validation.js"
import { getCategories } from "../../store/slices/blogs/getCategory/slices.js";
import { getArticles, postBlog } from "../../store/slices/blogs/slices.js";
import RenderCategoryBlogs from "../blogs/blogs-components/categoryBlogs.js";
import "../../components/ContainForm.scss"


const initialValuesPublishBlog = {
    title:"",
    content: "",
    country:"",
    CategoryId: "",
    url:"",
    picture: "",
    keywords:""
};

function PublishBlog () {
    const titleRef = useRef()
    const countryRef = useRef()
    const categoryRef = useRef()
    const contentRef = useRef()
    const keywordsRef = useRef()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [file, setFile] = useState("null")

    const [valueCategory, setValue] = useState({id:"",name:""});

    const { categories } = useSelector(state => {
        return {
            categories : state.category.categories
        }
    })

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    const handleChange = (event) => {
        setValue({
            id:event.target.selectedOptions[0].className, 
            name:event.target.value 
        })
    }

    const formData = new FormData()

    const onButtonPublishBlog = () => {
        let output ={ 
            data : { 
                "title":titleRef.current?.value,
                "content":contentRef.current?.value,
                "country":countryRef.current?.value,
                "CategoryId":categoryRef.current?.selectedIndex,
                "url":"",
                "keywords":keywordsRef.current?.value
            },
            file : file    
        }
        formData.append("data",JSON.stringify(output.data))
        formData.append("file",output.file)
    }

    const onConfirmPublish = () => {
        dispatch(postBlog(formData))
        navigate('/dashboard')
        dispatch(getArticles({
            id_cat : "", 
            page : 1,
            sort : "DESC"
        }))
    } 

    const onDrop = (acceptedFiles,FileRejection) => {
        FileRejection.length == 0 
        ?
        setFile(acceptedFiles[0])
        :
        setFile(FileRejection[0].errors[0])
    }

    const {getInputProps , open} = useDropzone({
        onDrop,
        //  , 
        maxFiles:1 , 
        accept : {'image/*' : ['.jpg','.jpeg','.webp','.png','.gif']} ,
        maxSize :1000000,
        noClick : true ,
        noKeyboard : true
    }) 

    const onButtonCancelUpload = () =>{
        setFile("null")
      }
      
    return (
        <Formik
            initialValues={initialValuesPublishBlog}
            validationSchema={publishBlogSchema}
        >
        {({ errors, touched}) => {
            return (
                <div className="container pb-10">
                    <div className="form card w-4/12 bg-base-100 shadow-xl">
                        <Form>
                        <h1>Create a Blog</h1>
                        <div className="form-row mt-5">
                            <label>Title</label>
                            <Field
                                type="text"
                                name="title"
                                id="title"
                                innerRef = {titleRef}
                                className={
                                    errors.title && touched.title 
                                    ? "input-error input input-md w-full" 
                                    : "input input-bordered input-md w-full"
                                }
                            />
                            <ErrorMessage name="title" component="span" className="error" />
                        </div>

                        <div className="form-row">
                            <label >Country</label>
                            <Field
                                type="text"
                                name="country"
                                id="country"
                                innerRef = {countryRef}
                                className={
                                    errors.country && touched.country 
                                    ? "input-error input input-md w-full" 
                                    : "input input-bordered input-md w-full"
                                }
                            />
                            <ErrorMessage name="author" component="span" className="error" />
                        </div>

                        <div className="form-row">
                            <label >Content</label>
                            <Field
                                as="textarea"
                                name="content"
                                id="content"
                                innerRef = {contentRef}
                                className={
                                    errors.content && touched.content 
                                    ? "notlisted-error textarea textarea-bordered textarea-sm w-full" 
                                    : "notlisted textarea textarea-bordered textarea-sm w-full"
                                }
                            />
                            <ErrorMessage name="content" component="span" className="error" />
                        </div>

                        <div className="form-row ">
                            <label>Picture</label>
                            <div className={`alert alert-error ${file?.code ? "" : "hidden"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{file?.code}</span>
                            </div>      
                            <div 
                                className={`flex file-input-bordered file-input-md h-auto py-5 border-2 ${file.name === null && touched.picture ? "input-error" :"border-cyan-800" }  w-full rounded-md break-all`}
                            >
                                <input {...getInputProps({name : 'image'})}/>
                                <a 
                                    onClick={open} 
                                    className='link link-hover text-amber-950 font-semibold rounded-lg w-auto ml-2 text-[12pt] flex-grow'
                                >
                                    {
                                        file?.name
                                        ? file.name 
                                        : "Choose a file"
                                    }
                                </a>
                                <button
                                    className={`btn btn-square btn-outline p-0 ${(file === "null" || file?.code) ? "hidden" : ""}`} 
                                      onClick={onButtonCancelUpload}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>             
                            </div>
                                {
                                    file.name == null && touched.picture
                                    ? <span className="error">Picture is required</span>
                                    : null
                                }
                        </div>

                        <div className="form-row">
                            <label >Category</label>
                            <Field
                                as="select"
                                name="category"
                                id="category"
                                innerRef = {categoryRef}
                                value={valueCategory.name}
                                onChange={handleChange}
                                className={
                                    valueCategory.name === "Select a Category" && touched.category
                                    ? "notlisted-error select select-bordered select-lg w-full" 
                                    : "notlisted select select-bordered select-lg w-full"
                                }
                            >   
                                <option defaultValue="Select a Category" >Select a Category</option>
                                <RenderCategoryBlogs categories={categories} />
                            </Field>
                            {
                                valueCategory.name === "Select a Category" && touched.category
                                ? <span className="error">Please Select a Category</span>
                                : null
                            }
                        </div>

                        <div className="form-row">
                            <label htmlFor="keywords">Keywords</label>
                            <Field
                                type="text"
                                name="keywords"
                                id="keywords"
                                innerRef = {keywordsRef}
                                className={
                                    errors.keywords && touched.keywords 
                                    ? "input-error input input-md w-full" 
                                    : "input input-bordered input-md w-full"
                                }
                            />
                            <ErrorMessage name="keywords" component="span" className="error" />
                        </div>
                                
                        <button 
                            className={
                                `btn btn-neutral 
                                ${
                                    (
                                        titleRef.current?.value === "" || 
                                        countryRef.current?.value === "" || 
                                        contentRef.current?.value === "" || 
                                        file === "null" ||
                                        valueCategory.name == "Select a Category" ||
                                        keywordsRef.current?.value === ""
                                    )
                                    ? "btn-disabled btn-outline btn-ghost" 
                                    : ""
                                }
                                `
                            } 
                            onClick={()=>{
                                window.modalConfirmation.showModal()
                                onButtonPublishBlog()
                            }}
                        >
                            Publish now
                        </button>
                            <dialog id="modalConfirmation" className="modal">
                            <div method="dialog" className="modal-box">
                                <h3 className="font-bold text-lg">Confirmation!</h3>
                                <p className="py-4">Are You Sure Wanna Publish This Blog?</p>
                                <div className="modal-action">
                                <button type="button" className="btn" onClick={()=>{window.modalConfirmation.close()}}>Close</button>
                                <button
                                    type="button"
                                    className="btn btn-accent"
                                    onClick={()=>{
                                        onConfirmPublish()
                                        window.modalConfirmation.close()

                                    }}
                                >
                                    Apply
                                </button>
                                </div>
                            </div>
                            </dialog>
                        </Form>
                    </div>
                </div>
            );
        }}
        </Formik>
    )
}

export default PublishBlog