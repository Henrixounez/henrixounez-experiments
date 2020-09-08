import { useEffect, useRef, useState } from 'react';
import { css, keyframes } from '@emotion/css'
import tw from '@tailwindcssinjs/macro'
import Layout from '../../components/layout'

const ControlButton = ({text, onClick, disabled=false}) => (
    <div onClick={!disabled && onClick} className={css(tw`select-none border-gray-100 border-solid border-2 py-2 shadow-xl rounded-lg cursor-pointer flex items-center justify-center`)}>
        {text}
    </div>
);
const ControlValue = ({text}) => (
    <div className={css(tw`border-gray-100 border-solid border-2 py-2 shadow-xl rounded-lg flex items-center justify-center`)}>
        {text}
    </div>
)

const ControlLine = ({name, value, showValue=true, valueChange, valueFn, fixedValue=2, lowLimit=false, autoMove=false, autoMoveValue=0, autoMoveFn=() => {}}) => (
    <>
        {autoMove ? (
            <ControlButton text={autoMoveValue === - 1 ? "◄" : "◁"} onClick={() => autoMoveFn(autoMoveValue === -1 ? 0 : -1)} />
        ) : (
            <div/>
        )}
        <ControlButton text={`${name} - ${Math.abs(valueChange[0])}`} onClick={() => valueFn((lowLimit !== false && value + valueChange[0] < lowLimit) ? value : value + valueChange[0])} />
        <ControlButton text={`${name} - ${Math.abs(valueChange[1])}`} onClick={() => valueFn((lowLimit !== false && value + valueChange[1] < lowLimit) ? value : value + valueChange[1])} />
        {showValue ? (
            <ControlValue text={value.toFixed(fixedValue)} />
        ) : (
            <div/>
        )}
        <ControlButton text={`${name} + ${valueChange[2]}`} onClick={() => valueFn(value + valueChange[2])} />
        <ControlButton text={`${name} + ${valueChange[3]}`} onClick={() => valueFn(value + valueChange[3])} />
        {autoMove ? (
            <ControlButton text={autoMoveValue === 1 ? "►" : "▷"} onClick={() => autoMoveFn(autoMoveValue === 1 ? 0 : 1)} />
        ) : (
            <div/>
        )}
    </>
)

const ControlEmpty = () => (
    <>
        <div/>
        <div/>
        <div/>
        <div className={css(tw`py-2`)}/>
        <div/>
        <div/>
        <div/>
    </>
)


const ControlPad = ({xFunction, yFunction, zoomFunction}) => (
    <>
        <div/>
        <div/>
        <ControlButton text="-" onClick={() => zoomFunction(zoom => zoom > 5 ? zoom - 5 : zoom)} />
        <ControlButton text="^" onClick={() => yFunction(y => y + 5)} />
        <ControlButton text="+" onClick={() => zoomFunction(zoom => zoom + 5)} />
        <div/>
        <div/>

        <div/>
        <div/>
        <ControlButton text="<" onClick={() => xFunction(x => x + 5)} />
        <ControlButton text="o" onClick={() => {xFunction(x => 0); yFunction(y => 0); zoomFunction(zoom => 50); }} />
        <ControlButton text=">" onClick={() => xFunction(x => x - 5)} />
        <div/>
        <div/>

        <div/>
        <div/>
        <div/>
        <ControlButton text="v" onClick={() => yFunction(y => y - 5)} />
        <div/>
        <div/>
        <div/>
    </>
)


const Hypocycloid = () => {
    const canvasRef = useRef(null);
    const [runK, setRunK] = useState(0);
    const [runTheta, setRunTheta] = useState(0);
    const [k, setk] = useState(4.0);
    const [Dtheta, setDtheta] = useState(0.1);
    const [zoom, setZoom] = useState(50);
    const [dX, setDX] = useState(0);
    const [dY, setDY] = useState(0);
    const [piLimit, setPiLimit] = useState(20);
    const height = 500;
    const width = 500;

    const getCoordinates = (k, theta) => {
        const R = 5;
        const r = 5 / k;
        const x = (R - r) * Math.cos(theta) + r * Math.cos(((R - r) / r) * theta);
        const y = (R - r) * Math.sin(theta) - r * Math.sin(((R - r) / r) * theta);
        return [x, y];
    };

    const createHypocycloid = ({k, Dtheta}) => {
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

        // Hypocycloid path
        ctx.beginPath();
        for (let theta = 0.0; theta < piLimit * Math.PI; theta += Dtheta) {
            const [x, y] = getCoordinates(k, theta);
            if (theta === 0.0)
                ctx.moveTo((width / 2) + (x * zoom) + (dX * zoom / 10), (height / 2) + (y * zoom) + (dY * zoom / 10));
            else
                ctx.lineTo((width / 2) + (x * zoom) + (dX * zoom / 10), (height / 2) + (y * zoom) + (dY * zoom / 10));
        }
        ctx.stroke();

        ctx.fillText(`k: ${k.toFixed(3)}, R: 5, r: ${(5 / k).toFixed(3)}`, 5, 10);
    };

    const createAutoMove = (value, valueFunc, valueChange, direction, stopFunction, lowLimit=false) => {
        const interval = setInterval(() => {
            if (direction === -1) {
                if (lowLimit !== false && value - valueChange < lowLimit) {
                    stopFunction(0);
                    clearInterval(interval);
                } else {
                    value -= valueChange;
                }
            } else {
                value += valueChange;
            }
            valueFunc(value);
        }, 100);
        return interval;
    }

    useEffect(() => {
        createHypocycloid({k, Dtheta});
    }, [k, Dtheta, zoom, piLimit, dX, dY]);

    useEffect(() => {
        let intervals = [];
        if (runK)
            intervals.push(createAutoMove(k, setk, 0.001, runK, setRunK, 1));
        if (runTheta)
            intervals.push(createAutoMove(Dtheta, setDtheta, 0.0001, runTheta, setRunTheta, 0.01));
        return () => {
            intervals.map((e) => clearInterval(e));
        }
    }, [runK, runTheta, zoom, piLimit, dX, dY]);

    return (
        <div className={css(tw`flex flex-col items-center`)}>
            <h1 className={css(tw`text-xl font-bold mb-5`)}>
                Hypocycloid
            </h1>
            <canvas ref={canvasRef} width={`${width}px`} height={`${height}px`} style={{width: `min(100vw, ${width}px)`, height: `min(100vw, ${width}px)`}} />
            <div className={css(tw`grid grid-cols-7`)}>

                <ControlLine name="k" value={k} valueChange={[-0.5, -0.1, 0.1, 0.5]} lowLimit={1} valueFn={setk} fixedValue={3} autoMove={true} autoMoveValue={runK} autoMoveFn={setRunK} />
                <ControlLine name="k" value={k} showValue={false} valueChange={[-0.01, -0.001, 0.001, 0.01]} lowLimit={1} valueFn={setk} />

                <ControlEmpty />

                <ControlLine name="lim π" value={piLimit} valueChange={[-5, -1, 1, 5]} lowLimit={1} valueFn={setPiLimit} fixedValue={0} />

                <ControlEmpty />

                <ControlLine name="dθ" value={Dtheta} valueChange={[-0.1, -0.01, 0.01, 0.1]} lowLimit={0.01} valueFn={setDtheta} fixedValue={4} autoMove={true} autoMoveValue={runTheta} autoMoveFn={setRunTheta} />
                <ControlLine name="dθ" value={Dtheta} showValue={false} valueChange={[-0.0001, -0.001, 0.001, 0.0001]} lowLimit={0.01} valueFn={setDtheta} />

                <ControlEmpty />

                <ControlPad xFunction={setDX} yFunction={setDY} zoomFunction={setZoom} />

            </div>
            <div className={css(tw`mt-5`, `max-width: 90%;`)}>
                <h2 className={css(tw`text-lg font-bold`)}>
                    How does this work ?
                </h2>
                <h3>
                    The coordinates of the points are calculated thanks to these formulae :
                    <ul className={css(tw`my-4`)}>
                        <li>x(θ) = (R - r) * cos(θ) + r * cos(((R - r) / r) * θ)</li>
                        <li>y(θ) = (R - r) * sin(θ) - r * sin(((R - r) / r) * θ)</li>
                    </ul>
                    The dθ is the interval between two points. If dθ is smaller, the precision will be higher, if dθ is larger, you will start to see straight lines instead of "curves".<br/>
                    Lim π determines when the θ will end its computing. Sometimes having a higher value of Lim π can show a lot more lines than you'd think !
                </h3>
            </div>
        </div>
    );
}

const Geometry = ({data}) => (
    <Layout title='Geometry' showPage description='Geometry visualisations'>
        <div className={css(tw`flex flex-col`)}>
            <Hypocycloid />
        </div>
    </Layout>
);

export default Geometry;