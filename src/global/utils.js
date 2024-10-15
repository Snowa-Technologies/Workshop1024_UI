
export const isLocalHost = () => {
    return window.location.hostname.includes('localhost');
};

const urlMapping = (() => {
    let mapping = {};

    const getSubdomain = () => {
        const hostname = window.location.hostname;
        const subdomain = hostname.split('.')[0];
        return subdomain;
    };
  
    const getAPIHost = () => {
        let origin = window.location.origin;
        let port = window.location.port;
        if(origin.includes("snowatech.in") || origin.includes("snowabot.com")){
            return origin.replace(mapping.subdomain, "adminapi");
        }
        else if(origin.includes('localhost')){
            return origin.replace(`${port}`,`${6010}`);
        }
        return origin.replace(mapping.subdomain, '');
    }
    mapping.subdomain = getSubdomain();
    mapping.apiHost = getAPIHost();
    return mapping;
});

export const urls = urlMapping();

export const utils = (() => {
    let utils = {};
    utils.isEmpty = val => {
        let p;
        for(p in val)
            return !1;
        return !0;
    };
    utils.noop = () => {
        return () => { };
    };
    return utils;
});
