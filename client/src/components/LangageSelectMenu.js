import { useNavigate } from "react-router-dom";
import languageList from './helpers'


function LanugageSelectMenu({onSetLanguage}) {
    const navigate = useNavigate()
    
    function handleSubmit(e) {
        e.preventDefault()
        onSetLanguage(e.target[0].value)
        navigate('/')
    }

    let uniqueId = 0
    let optionList = languageList.map(language => {
        uniqueId++
        let singleKey = Object.keys(language)[0]
        return <option key={uniqueId} value={language[singleKey]}>{singleKey}</option>
    })
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select name="language" defaultValue={'en'}>
                    {/* <option disabled selected='selected'>Please Select From Below</option> */}
                    {optionList}
                    {/* <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                    <option value="jp">Japanese</option> */}
                </select>
                <br></br>
                <input type='submit' value='Translate Menu'></input>
            </form>
        </div>
    )
}
export default LanugageSelectMenu