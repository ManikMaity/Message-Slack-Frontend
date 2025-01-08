import {createContext, useRef, useState} from "react";

const ChannelMessageContext = createContext(null);


export const ChannelMessageProvider = ({children}) => {
    const [channelMessages, setChannelMessages] = useState(null);

    return (
        <ChannelMessageContext.Provider value={{channelMessages, setChannelMessages}}>
            {children}
        </ChannelMessageContext.Provider>
    );
};


export default ChannelMessageContext;