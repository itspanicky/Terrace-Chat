import React from 'react'; 
import '../stylesheets/Header2.css'

const Header = () => {

    // return (
    //     <div className="header-container">
    //         <div className="logo-name">TERRACE</div>
    //         <div className="logo-name">CHAT</div>
    //         <div className="logo-line">
    //             インターネット上で
    //         </div>
    //         <div>
                
    //         </div>
    //     </div>
    // )

    return (
        <>
        <div className="header-container">
            <div className="logo-name">TERRACE CHAT</div>
            <div className="logo-side">
                <div className="logo-motto">ON THE</div>
                <div className="logo-motto">INTERNET</div>
                <div className="logo-line">
                    ウ ェ ブ 上 で
                </div>
            </div>
    
        </div>
        <div className="register-login">
            <button className="register">SIGN UP</button>
            <button className="login">LOG IN</button>
        </div>
        </>
    )
}

export default Header