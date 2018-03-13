import React, { Component } from 'react';
import io from 'socket.io-client';

var HANDSIZE = 20;
var HANDCLOSEDCOLOR = "red";
var HANDOPENCOLOR = "green";
var HANDLASSOCOLOR = "blue";
var ctx;

class KinectView extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        var canvas = document.getElementById('bodyCanvas');
        var ctx = canvas.getContext('2d');
        var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
        var socket = io.connect('127.0.0.1:8000');

        socket.on('bodyFrame', function (bodyFrame) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var index = 0;
            bodyFrame.bodies.forEach(function (body) {
                if (body.tracked) {
                    for (var jointType in body.joints) {
                        var joint = body.joints[jointType];
                        ctx.fillStyle = colors[index];
                        ctx.fillRect(joint.depthX * 512, joint.depthY * 424, 3, 3);
                    }
                    index++;
                }
            });
        });
    }

    updateHandState(handState, jointPoint) {
        switch (handState) {
            case 3:
                this.drawHand(jointPoint, HANDCLOSEDCOLOR);
                break;

            case 2:
                this.drawHand(jointPoint, HANDOPENCOLOR);
                break;

            case 4:
                this.drawHand(jointPoint, HANDLASSOCOLOR);
                break;
        }
    }

    drawHand(jointPoint, handColor) {
        // draw semi transparent hand cicles
        ctx.globalAlpha = 0.75;
        ctx.beginPath();
        ctx.fillStyle = handColor;
        ctx.arc(jointPoint.depthX * 512, jointPoint.depthY * 424, HANDSIZE, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1;
    }

    render() {
        return (
            <div>
                <canvas id="bodyCanvas" width="512" height="424"></canvas>
            </div>
        );
    }
}

export default KinectView;