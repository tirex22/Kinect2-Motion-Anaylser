import React, { Component } from 'react';
import { Checkbox } from 'antd';
var ctx;
var canvas;

let activeJointColor = '#e03162';
let inActiveJointColor = '#ddd';
let otherColor = '#6355e0';

let width = 400;
let height = 333;
let selectedJoints = [];
let bodyParts = [
    { "x": 0.5235015153884888, "y": 0.4433409571647644 },
    { "x": 0.5280672311782837, "y": 0.28056764602661133 },
    { "x": 0.5326171517372131, "y": 0.11840316653251648 },
    { "x": 0.5347625613212585, "y": 0.04411391541361809 },
    { "x": 0.45775362849235535, "y": 0.17945419251918793 },
    { "x": 0.40173664689064026, "y": 0.3056611120700836 },
    { "x": 0.3171638548374176, "y": 0.4160751700401306 },
    { "x": 0.2920893132686615, "y": 0.43409955501556396 },
    { "x": 0.6092076897621155, "y": 0.18061068654060364 },
    { "x": 0.6662267446517944, "y": 0.31479960680007935 },
    { "x": 0.7398558855056763, "y": 0.4137920141220093 },
    { "x": 0.7720243334770203, "y": 0.442656546831131 },
    { "x": 0.4908684492111206, "y": 0.44325393438339233 },
    { "x": 0.46591809391975403, "y": 0.6245194673538208 },
    { "x": 0.45836225152015686, "y": 0.8049309849739075 },
    { "x": 0.4363950490951538, "y": 0.8593794703483582 },
    { "x": 0.556381344795227, "y": 0.4434279203414917 },
    { "x": 0.5844973921775818, "y": 0.6235111951828003 },
    { "x": 0.5943882465362549, "y": 0.8159821629524231 },
    { "x": 0.6071970462799072, "y": 0.8669485449790955 },
    { "x": 0.5314992666244507, "y": 0.15872476994991302 },
    { "x": 0.2624439001083374, "y": 0.4620920717716217 },
    { "x": 0.2707090377807617, "y": 0.4012562334537506 },
    { "x": 0.7994346618652344, "y": 0.476694792509079 },
    { "x": 0.7988439798355103, "y": 0.41120457649230957 }
]


let LA = [];
let RA = [];
let LL = [];
let RL = [];
let other = [0, 1, 2, 3, 20];

class BodyView extends Component {

    componentDidMount() {

        for (let i = 0; i < 25; i++) {
            selectedJoints.push(i);
        }

        canvas = document.getElementById('bodyCanvas');
        ctx = canvas.getContext('2d');
        this.drawBody();
    }

    SelectBodyPart(bodyPart) {
        switch (bodyPart) {
            case "LA": LA.length === 0 ? LA = [4, 5, 6, 7, 22, 21] : LA = []; break;
            case "RA": RA.length === 0 ? RA = [8, 9, 10, 11, 23, 24] : RA = []; break;
            case "LL": LL.length === 0 ? LL = [12, 13, 14, 15] : LL = []; break;
            case "RL": RL.length === 0 ? RL = [16, 17, 18, 19] : RL = []; break;
            default: break;
        }
        this.drawBody();
    }

    join(from, to) {
        ctx.beginPath();
        ctx.moveTo((bodyParts[from].x - 0.04) * width, bodyParts[from].y * height);
        ctx.lineTo((bodyParts[to].x - 0.04) * width, bodyParts[to].y * height);
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    drawBody() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 25; i++) {
            let joint = bodyParts[i];
            if (other.includes(i)) {
                ctx.fillStyle = otherColor;
            }
            else if (LL.includes(i) || RL.includes(i) || LA.includes(i) || RA.includes(i)) {
                ctx.fillStyle = activeJointColor;
            } else {
                ctx.fillStyle = inActiveJointColor;
            }
            ctx.fillRect((joint.x - 0.04) * width, joint.y * height, 4, 4);
        }
        ctx.fillStyle = activeJointColor;
    }

    getSelectedJoints() {
        let selectedJoints = [];
        selectedJoints = selectedJoints.concat(LA);
        selectedJoints = selectedJoints.concat(RA);
        selectedJoints = selectedJoints.concat(LL);
        selectedJoints = selectedJoints.concat(RL);
        let res = {
            selected_joints: selectedJoints,
            // other: other
        }
        return (res);
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: 30, }}>
                    <Checkbox onChange={() => this.SelectBodyPart("RA")}>Right Arm</Checkbox>
                    <Checkbox onChange={() => this.SelectBodyPart("LA")}>Left Arm</Checkbox>
                    <Checkbox onChange={() => this.SelectBodyPart("RL")}>Right Leg</Checkbox>
                    <Checkbox onChange={() => this.SelectBodyPart("LL")}>Left Leg</Checkbox>
                </div>
                <canvas
                    style={{ marginTop: 30, }}
                    id="bodyCanvas"
                    ref={"canvas"}
                    width={width.toString()}
                    height={height.toString()} />
            </div>
        );
    }
}

export default BodyView;