//Vanilla js

// //Codigo imperativo, no escalable

// // Recupera el elemento que queremos del documento HTML
// const buttons = document.querySelectorAll("button")

// //Añadimos una función al evento click del botón
// buttons.forEach(button=>{
//     button.addEventListener("click", ()=>{
//         // Recupera el id del elemento
//         const id = button.getAttribute('data-id')
//         if (button.classList.contains('liked')){
//             button.classList.remove('liked')
//             button.innerText = 'Me gusta'
//         }else{
//             button.classList.add('liked')
//             button.innerText = 'Quitar me gusta'
//         }

//     })
// })

// Con React
// Codigo declarativo
import React from "https://esm.sh/react@18.2.0"
import ReactDOM from "https://esm.sh/react-dom@18.2.0/client"

const appDomElement = document.getElementById('app');

const root = ReactDOM.createRoot(appDomElement)

const button = React.createElement('button',{"data-id": 123},'button 1')
const button2 = React.createElement('button',{"data-id": 123},'button 2')
const button3 = React.createElement('button',{"data-id": 123},'button 3')

const app = React.createElement(React.Fragment,null,[button,button2,button3])

//React con JSX

{/* <React.Fragment>
    <button data-id="123">Button 1</button>
    <button data-id="456">Button 2</button>
    <button data-id="789">Button 3</button>
</React.Fragment> */}



root.render(app)



