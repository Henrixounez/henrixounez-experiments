const breakpoints = [640, 768, 1024, 1280];
const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
)
export default mq