export default function boldTransitionBefore(name, boldness) {
    return (`
        text-align: center;
        display: inline-block;
        &:before {
            content: "${name}";
            font-weight: ${boldness};
            display: block;
            height: 0;
            overflow: hidden;
            visibility: hidden;
        }
    `);
}