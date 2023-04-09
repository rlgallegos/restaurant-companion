import { useNavigate } from "react-router-dom";


function LanugageSelectMenu({onSetLanguage}) {
    const navigate = useNavigate()
    
    function handleSubmit(e) {
        e.preventDefault()
        onSetLanguage(e.target[0].value)
        navigate('/')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select name="language">
                    <option disabled>Please Select From Below</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                    <option value="jp">Japanese</option>
                </select>
                <br></br>
                <input type='submit' value='Translate Menu'></input>
            </form>
        </div>
    )
}
export default LanugageSelectMenu