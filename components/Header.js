import React from 'react'

export default function Header(props) {

    return (
        <div className='header'>
            <div className='content'>
                前端监控系统
            </div>
            <style jsx>{`
                .header {
                    height: 100%;
                    line-height: 50px;
                    background: #eee;
                }
            `}</style>
        </div>
    )
}

// import _JSXStyle from 'styled-jsx/style'

// export default () => (
//   <div className="jsx-123">
//     <p className="jsx-123">only this paragraph will get the style :)</p>
//     <_JSXStyle id="123">{`p.jsx-123 {color: red;}`}</_JSXStyle>
//   </div>
// )