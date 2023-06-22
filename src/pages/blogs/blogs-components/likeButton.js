// import { useDispatch } from "react-redux";
// import { FcLike, FcLikePlaceholder } from "react-icons/fc";

// const LikeButton = ({ blogId }) => {
//   const dispatch = useDispatch();
//   const [liked, setLiked] = useState(false);

//   const handleLike = () => {
//     if (liked) {
//       dispatch(unlikeArticle(blogId));
//     } else {
//       dispatch(likeArticle(blogId));
//     }
//     setLiked(!liked);
//   };

//   return (
//     <button onClick={handleLike}>
//       {liked ? <FcLike /> : <FcLikePlaceholder />}
//     </button>
//   );
// };

// export default LikeButton;
