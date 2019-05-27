const POST = (url = '', data = {}) => {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
    }).then(response => response.json());
};

let Action = (action, data) => {
    return {action, ...data};
};

function onClickBoard(e) {
    let b = document.getElementById("board");
    let m = Math.floor(b.offsetWidth / 19);

    POST('/game/', Action('add', {
        'x': Math.floor(e.offsetX / m).toString(),
        'y': Math.floor(e.offsetY / m).toString()
    })).then(updatePositionSVG)
}

const setANS = (target, pairs = {}) => {
    Object.entries(pairs).forEach(v => target.setAttributeNS(null, v[0], v[1]));
    return target;
};

const svgNS = "http://www.w3.org/2000/svg";
const Svg = () => document.createElementNS(svgNS, "svg");
const CreateSVG = (name) => document.createElementNS(svgNS, name);
const CircleSVG = () => CreateSVG("circle");

function updatePositionSVG(data) {
    let b = document.getElementById("board");
    let m = Math.floor(b.offsetWidth / 19);
    let f = Math.floor(m / 2);

    let div = document.createElement('div');

    let svg = Svg();
    svg.setAttribute('height', m.toString());
    svg.setAttribute('width', m.toString());

    let fill: string = data.symbol === 'x' ? 'black' : "white";
    svg.appendChild(setANS(CircleSVG(), {
        id: "circle1",
        cx: f,
        cy: f,
        r: f,
        fill: fill,
        stroke: "black"
    }));

    div.setAttribute('class', "stone");
    div.style.left = (data.x * m) + 1 + 'px';
    div.style.top = (data.y * m) + 1 + 'px';
    div.style.opacity = '1';


    div.appendChild(svg);
    b.appendChild(div);

    let s = document.getElementById('status');
    s.innerHTML = data.status;
}

function drawSVG(data) {
    let b = document.getElementById("board");
    // data.board.map((o, i) => b.appendChild(createPositionSVG(data, o, i)));
    document.body.appendChild(b);
    b.onclick = onClickBoard;

    let s = document.createElement("div");
    s.setAttribute("id", "status");
    s.innerHTML = data.status;
    document.body.appendChild(s);
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/game/').then(r => r.json()).then(drawSVG);
});