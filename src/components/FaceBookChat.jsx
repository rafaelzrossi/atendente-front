import React, {useEffect} from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';

export default function FaceBookChat() {

    useEffect(() => {
        // window.fbAsyncInit = function() {
        //     FB.init({
        //       xfbml            : true,
        //       version          : 'v6.0'
        //     });
        //   };
    
        //   (function(d, s, id) {
        //   var js, fjs = d.getElementsByTagName(s)[0];
        //   if (d.getElementById(id)) return;
        //   js = d.createElement(s); js.id = id;
        //   js.src = 'https://connect.facebook.net/pt_BR/sdk/xfbml.customerchat.js';
        //   fjs.parentNode.insertBefore(js, fjs);
        // }(document, 'script', 'facebook-jssdk'));
    }, [])


    return (<>
        {/* <MessengerCustomerChat
            pageId="104279481280648"
            appId="178145949230870"
            htmlRef={window.location.pathname}
            shouldShowDialog={false}
            version='4.0'
        /> */}
        <div
            className="fb-customerchat"
            attribution='setup_tool'
            page_id="104279481280648"
            logged_in_greeting="Olá, seja bem-vindo à nossa Loja!"
            logged_out_greeting="Olá, seja bem-vindo à nossa Loja!">
    </div>
    </>)
}
