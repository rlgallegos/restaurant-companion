import { useNavigate } from "react-router-dom";
import { languageList } from './helpers'
import { useState } from "react";


function LanugageSelectMenu({onSetLanguage}) {
    const tailwindCSSButton2 = "my-4 mx-12 text-m flex-grow text-gray-800 border border-gray-100 rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const navigate = useNavigate()

    
    function handleSubmit(e) {
        e.preventDefault()
        onSetLanguage(e.target[0].value)
    }

    let uniqueId = 0
    let optionList = languageList.map(language => {
        uniqueId++
        let singleKey = Object.keys(language)[0]
        return <option key={uniqueId} value={language[singleKey]}>{singleKey}</option>
    })
    return (
        <div className="my-1 text-m flex-grow border border-white rounded-md px-4 py-4 flex items-center w-full md:w-1/2 mx-auto">
            <form className="w-full" onSubmit={handleSubmit} >  
                <select name="language" defaultValue={'en'} className="mx-12">
                    {optionList}
                </select>
                <input type='submit' value='Translate Menu' className={tailwindCSSButton2}></input>
            </form>
        </div>
    )
}
export default LanugageSelectMenu