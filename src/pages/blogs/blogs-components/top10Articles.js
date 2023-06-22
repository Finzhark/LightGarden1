function Top10Articles ({
    index = "",
    title = "",
    total_fav = "",
}) {
    return (
        <div className="card w-[100%] bg-base-100 shadow-xl ">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="card-actions justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                {total_fav}
                </div>
            </div>
        </div>
    )
}

export default function RenderTop10Articles ({
    top10_fav = [],
}) {
    return top10_fav.filter((top10, index)=>index<10).map((top10,index) => {
        return (
            <Top10Articles key={top10.id}
                index={index}
                title={top10.title}
                total_fav={top10.total_fav}
            />
        )
    })
}