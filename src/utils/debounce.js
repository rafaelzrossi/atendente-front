export default (fn, wait=1000, time) => (...args) =>{
    clearTimeout(time);
    time = setTimeout(fn, wait, ...args)
}