import Layer from './components/layer/layer.js';
// import "./css/common.css";
const App = function() {
    const oApp = document.querySelector('#app');
    oApp.innerHTML += Layer().tplhtml;
    oApp.innerHTML += new Layer().tpl({
        name: 'emily',
        arr: [...
            'biu'
        ]
    });
    // oApp.innerHTML = layer.tpl({
    //     name: 'emily',
    //     arr: [0.5, "ha", 3]
    // });
    console.log(Layer);
};

new App();
