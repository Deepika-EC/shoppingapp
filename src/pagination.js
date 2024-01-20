
function Pagination({records,update,prev,next,index,activePage}){
    let n=records
    let pages=[]
    for(let i=1;i<=n;i++){
        pages.push(i)
    }

    return(
        <div>
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a href="#" className="page-link" onClick={prev}>Prev</a>
                </li>
                {pages.map((p,index)=>(
                    <li className={`page-item ${activePage===p ? "active" : ""}`}>
                        <a href="#" className="page-link" onClick={()=>{update(p)}}>{p}</a>
                    </li>
                ))}
                <li className="page-item">
                    <a href="#" className="page-link" onClick={next}>Next</a>
                </li>
            </ul>
        </div>
    )
}
export default Pagination;