import tplhtml from "./layer.html";
import tpl from "./layer.tpl";
// import "./layer.less";
// import './layer.scss';

function layer() {
    const NUM = 5;
    return {
        name: 'layer',
        tpl,
        tplhtml
    };
}

export default layer;
