import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../../store/slices/blogs/getCategory/slices";

function SidebarCategories({ category }) {
    return (
      <li className="text-gray-600 mb-1">
        {category}
      </li>
    );
  }
  
  export default function RenderSidebarCategories() {
    const dispatch = useDispatch();
    const sideCat = useSelector((state) => state.category.categories);
  
    useEffect(() => {
      dispatch(getCategories());
    }, [dispatch]);
  
    return (
      <div className="px-10  h-fit">
       <h3 className="font-bold text-lg py-3">Available category</h3>
       <h4 className="font-bold pb-2">Please pick one from "All Category"</h4>
        <ul className="text-[15pt]">
          {sideCat.map((category) => (
            <SidebarCategories key={category.id} category={category.name} />
          ))}
        </ul>
      </div>
    );
  }
  
