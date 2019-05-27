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

function onClickPosition(p) {
    p.innerHTML = 'z'; //In Process "Spinner"
    POST('/game/', Action('add', {
        'x': this.dataset.x,
        'y': this.dataset.y
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
    let svg = Svg();
    svg.setAttribute('height', "100%");
    svg.setAttribute('width', "100%");

    let fill: string = data.symbol === 'x' ? 'black' : "white";
    svg.appendChild(setANS(CircleSVG(), {
        id: "circle1",
        cx: 11,
        cy: 11,
        r: 11,
        fill: fill,
        stroke: "black"
    }));

    let h = Math.ceil(screen.availHeight / 19);
    let w = Math.ceil(screen.availWidth / 19);
    let m = h < w ? h : w;
    let div = document.createElement('div');
    div.setAttribute('class', "stone");
    div.style.left = (data.x * m) + 1 + 'px';
    div.style.top = (data.y * m) + 1 + 'px';
    div.style.opacity = '1';


    div.appendChild(svg);
    let b = document.getElementById('board');
    b.appendChild(div);

    let s = document.getElementById('status');
    s.innerHTML = data.status;
}

function createPositionSVG(data, o, i) {
    let id = o === 'x' ? 'black_stone' : 'white_stone';

    let temp = document.getElementById(id);
    let d: any = temp.cloneNode();

    if (!d) {
        console.log(`no such id '${id}'`);
        return;
    }

    let x = i % data.size;
    let y = Math.floor(i / data.size);

    d.dataset.x = x.toString();
    d.dataset.y = y.toString();

    let h = Math.ceil((screen.availHeight / 19) * 0.95);
    let w = Math.ceil((screen.availWidth / 19) * 0.95);
    let s = h < w ? h : w;

    d.style.left = (x * s) + 'px';
    d.style.top = (y * s) + 'px';

    d.style.position = 'absolute';
    d.style.display = 'block';
    d.style.border = '0px solid silver';

    d.setAttribute('id', `p_${d.dataset.x}_${d.dataset.y}`);

    d.onclick = onClickPosition;
    return d;
}

function drawSVG(data) {
    let b = document.getElementById("board");
    data.board.map((o, i) => b.appendChild(createPositionSVG(data, o, i)));
    document.body.appendChild(b);

    let s = document.createElement("div");
    s.setAttribute("id", "status");
    s.innerHTML = data.status;
    document.body.appendChild(s);
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/game/').then(r => r.json()).then(drawSVG);
});