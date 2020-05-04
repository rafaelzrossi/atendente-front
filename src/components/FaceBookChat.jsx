import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';

export default function FaceBookChat() {

    return (<>
        {/* <MessengerCustomerChat
            pageId="104279481280648"
            appId="178145949230870"
            htmlRef={window.location.pathname}
            shouldShowDialog={false}
            version='4.0'
        /> */}
        <div className="fb-customerchat"
            attribution='setup_tool'
            page_id="104279481280648"
            logged_in_greeting="Olá, seja bem-vindo à nossa Loja!"
            logged_out_greeting="Olá, seja bem-vindo à nossa Loja!">
        </div>
    </>)
}
