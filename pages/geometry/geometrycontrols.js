import { css } from '@emotion/css'
import tw from '@tailwindcssinjs/macro'


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

export {
    createAutoMove,
    ControlButton,
    ControlValue,
    ControlLine,
    ControlEmpty,
    ControlPad,
};