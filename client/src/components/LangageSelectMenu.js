import { useNavigate } from "react-router-dom";
import { languageList } from './helpers'


function LanugageSelectMenu({onSetLanguage}) {
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
        <div className="my-1 ml-4 text-m flex-grow text-gray-900 border border-blue-400 rounded-md px-4 py-4 flex items-center">
            <form className="w-full" onSubmit={handleSubmit}>
                <select name="language" defaultValue={'en'}>
                    {optionList}
                </select>
                <br />
                <input type='submit' value='Translate Menu' className="mt-8 ml-auto text-m flex-grow text-gray-900 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out"></input>
            </form>
        </div>
    )
}
export default LanugageSelectMenu