import { useNavigate } from "react-router-dom"


function ManageNavPlaque(){
    const tailwindCSSCard = "card bg-gray-100 bg-opacity-80 rounded-md shadow-md w-5/6 md:w-1/2 p-6 my-10 mx-auto"
    const tailwindCSSCard2 = "card md:col-span-2 bg-gray-100 bg-opacity-80 rounded-md shadow-md w-5/6 md:w-1/4 p-6 my-10 mx-auto"
    const tailwindCSSSubTitle = "text-xl text-gray-700 my-4"
    
    const navigate = useNavigate()

    function handleClick(e){
        console.log(e.currentTarget.getAttribute('name'))
        navigate(`${e.currentTarget.getAttribute('name')}`)
    }

    return (
    <div className='bg-gray-100 bg-opacity-40 w-5/6 md:w-2/3 mx-auto p-6 grid sm:grid-cols-1 md:grid-cols-2 mt-10 items-center'>
        <div className={tailwindCSSCard} name="menu" onClick={handleClick}>
            <h1 className={tailwindCSSSubTitle}>Menu</h1>
        </div>
        <div className={tailwindCSSCard} name="menu/add" onClick={handleClick}>
            <h1 className={tailwindCSSSubTitle}>Add New Item</h1>
        </div>
        <div className={tailwindCSSCard} name='users' onClick={handleClick}>
            <h1 className={tailwindCSSSubTitle}>Users</h1>
        </div>
        <div className={tailwindCSSCard} name='restaurant' onClick={handleClick}>
            <h1 className={tailwindCSSSubTitle}>Restaurant</h1>
        </div>
        <div className={tailwindCSSCard2} name='subscription' onClick={handleClick}>
            <h1 className={tailwindCSSSubTitle}>Subscription</h1>
        </div>
    </div>
    )
}
export default ManageNavPlaque