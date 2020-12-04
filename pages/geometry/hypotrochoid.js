import { useEffect, useRef, useState } from 'react';
import xw from 'xwind';

import { ControlLine, ControlEmpty, ControlPad, createAutoMove } from './geometrycontrols';

const Hypotrochoid = () => {
    const canvasRef = useRef(null);
    const [runR, setRunR] = useState(0);
    const [runr, setRunr] = useState(0);
    const [runD, setRunD] = useState(0);

    const [R, setR] = useState(5.0505);
    const [r, setr] = useState(10.0);
    const [d, setD] = useState(5.0);
    const [zoom, setZoom] = useState(25);
    const [dX, setDX] = useState(0);
    const [dY, setDY] = useState(0);

    const [Dtheta, setDtheta] = useState(0.1);
    const [piLimit, setPiLimit] = useState(200);
    const height = 500;
    const width = 500;

    const getCoordinates = (R, r, d, theta) => {
        const x = (R - r) * Math.cos(theta) + d * Math.cos(((R - r) / r) * theta);
        const y = (R - r) * Math.sin(theta) - d * Math.sin(((R - r) / r) * theta);
        return [x, y];
    };

    const createHypotrochoid = ({R, r, d, Dtheta}) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeStyle = "#000000";

        // Border
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(width, 0);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.lineTo(0, 0);
        ctx.stroke();

        // Hypotrochoid path
        ctx.beginPath();
        for (let theta = 0.0; theta < piLimit * Math.PI; theta += Dtheta) {
            const [x, y] = getCoordinates(R, r, d, theta);
            if (theta === 0.0)
                ctx.moveTo((width / 2) + (x * zoom) + (dX * zoom / 10), (height / 2) + (y * zoom) + (dY * zoom / 10));
            else
                ctx.lineTo((width / 2) + (x * zoom) + (dX * zoom / 10), (height / 2) + (y * zoom) + (dY * zoom / 10));
        }
        ctx.stroke();

        ctx.fillText(`R: ${R.toFixed(3)}, r: ${r.toFixed(3)}, d: ${d.toFixed(3)}`, 5, 10);
    };

    useEffect(() => {
        createHypotrochoid({R, r, d, Dtheta});
    }, [R, r, d, Dtheta, zoom, piLimit, dX, dY]);

    useEffect(() => {
        let intervals = [];
        if (runR)
            intervals.push(createAutoMove(R, setR, 0.0001, runR, setRunR, 0.01));
        if (runr)
            intervals.push(createAutoMove(r, setr, 0.0001, runr, setRunr, 0.01));
        if (runD)
            intervals.push(createAutoMove(d, setD, 0.1, runD, setRunD, 0.01));

        // if (runTheta)
        //     intervals.push(createAutoMove(Dtheta, setDtheta, 0.0001, runTheta, setRunTheta, 0.01));
        return () => {
            intervals.map((e) => clearInterval(e));
        }
    }, [runR, runr, runD, zoom, piLimit, dX, dY]);

    return (
        <div css={xw`flex flex-col items-center mb-10`}>
            <h1 css={xw`text-xl font-bold mb-5`}>
                Hypotrochoid
            </h1>
            <canvas ref={canvasRef} width={`${width}px`} height={`${height}px`} style={{width: `min(100vw, ${width}px)`, height: `min(100vw, ${width}px)`}} />
            <div css={xw`grid grid-cols-7`}>

                <ControlLine name="R" value={R} valueChange={[-0.1, -0.01, 0.01, 0.1]} lowLimit={0} valueFn={setR} fixedValue={4} autoMove={true} autoMoveValue={runR} autoMoveFn={setRunR} />
                <ControlLine name="R" value={R} valueChange={[-0.001, -0.0001, 0.0001, 0.001]} lowLimit={0} valueFn={setR} fixedValue={4} showValue={false} />

                <ControlEmpty />

                <ControlLine name="r" value={r} valueChange={[-0.1, -0.01, 0.01, 0.1]} lowLimit={0} valueFn={setr} fixedValue={4} autoMove={true} autoMoveValue={runr} autoMoveFn={setRunr} />
                <ControlLine name="r" value={r} valueChange={[-0.001, -0.0001, 0.0001, 0.001]} lowLimit={0} valueFn={setr} fixedValue={4} showValue={false} />

                <ControlEmpty />

                <ControlLine name="d" value={d} valueChange={[-0.5, -0.1, 0.1, 0.5]} lowLimit={0} valueFn={setD} fixedValue={1} autoMove={true} autoMoveValue={runD} autoMoveFn={setRunD} />

                <ControlEmpty />

                <ControlPad xFunction={setDX} yFunction={setDY} zoomFunction={setZoom} />

            </div>
            <div css={[xw`mt-5`, `max-width: 90%; min-width: 90%;`]}>
                <h2 css={xw`text-lg font-bold`}>
                    Explanation:
                </h2>
                <h3>
                    The coordinates of the points are calculated thanks to these formulae :
                    <ul css={xw`my-4`}>
                        <li>x(θ) = (R - r) * cos(θ) + d * cos(((R - r) / r) * θ)</li>
                        <li>y(θ) = (R - r) * sin(θ) - d * sin(((R - r) / r) * θ)</li>
                    </ul>
                </h3>
            </div>
        </div>
    );
}

export default Hypotrochoid;