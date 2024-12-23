import './Category.scss'


const Category = () => {
    return (
        <>
            <div className="categories">
                <div className='categories-title'>
                    <span>категорії</span>
                </div>

                <div className='category home'>
                    <span>home</span>
                </div>
                <div className='category job'>
                    <span>job</span>
                </div>
                <div className='category entertainment'>
                    <span>entertainment</span>
                </div>
            </div>
        </>
    )
}

export default Category