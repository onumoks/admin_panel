import Local from './local'

let config = {};

switch (true) {
    case window.location.pathname.indexOf('localhost') !== -1:
        config = Local;
        break;

    default:
        config = Local;
        break;
}

export default config;