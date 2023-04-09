// import { useState } from 'react';

import LanugageSelectMenu from "./LangageSelectMenu";

function Welcome({onSetLanguage}) {

    return (
        <div>
            <h1>Welcome to Website Name</h1>
            <LanugageSelectMenu onSetLanguage={onSetLanguage} />
        </div>
    )
}

export default Welcome