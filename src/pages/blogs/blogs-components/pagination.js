import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';

export default function Pagination ({
    disabledPrev = false,
    disabledNext = false,
    onChangePagination = (type = "next") => {},
}) {
    return (
        <div className="grid grid-cols-2 ">
            <button className={`flex items-center justify-center ml-auto bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 mr-3 rounded-full 
                ${disabledPrev}? 'bg-gray-500 cursor-not-allowed' : ''`} disabled={disabledPrev} onClick={() => onChangePagination("prev")}>
                <GrLinkPrevious />
            </button>
            <button className={`flex items-center justify-center ml-auto bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 ml-3 rounded-full 
                ${disabledPrev}? 'bg-gray-500 cursor-not-allowed' : ''`} disabled={disabledNext} onClick={() => onChangePagination("next")}>
                <GrLinkNext />
            </button>
        </div>
    )
}