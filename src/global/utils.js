
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
    /**
     * If the Dev and Prod deployment take the same domain and update the subdomain to coreapi. 
     */
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

/***
 * This function is convert to longDate fomate (jul 31 2024 08:05 PM)
 */
export const longDateFormat = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = date.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 hours to 12
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    return `${formattedDate.replace(/,/g, "")} ${formattedTime}`;
};

export const dateMonthFormat = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = date.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return formattedDate;
}

/***
 * This Function is convert number to amount Formate
 */

export const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat('en-IN').format(Number(amount));
    return formattedAmount
}

export const longMonthFormat = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = date.toLocaleString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    return formattedDate;
}

export const dayMonthDateFormat = (timeStamp) => { //Example ( 05 Aug )
    const date = new Date(timeStamp);
    const formattedDate = date.toLocaleString('en-GB', { day: '2-digit', month: 'short' });
    return formattedDate;
}
/**
 * This function will give monthName based on month number
 */
export const getMonthName = (monthNumber) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    // Ensure the month number is between 1 and 12
    if (monthNumber < 1 || monthNumber > 12) {
      throw new Error('Invalid month number');
    }

    return months[monthNumber - 1]; // Array index is zero-based
  };

export const validateFields = {'text' : /^[a-zA-Z0-9 ]{0,50}$/, 'number' : /^[0-9]+$/, "p_no" : /^[A-Z0-9]{10}$/,
'email' : /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/, 'tel' : /^[6-9]{1}[0-9]{9}$/, "addr" : /^[a-zA-Z0-9 .,-:;]{1,150}$/}; // Regex for type validations

export const longDateTimeFormat = (timeStamp) => { //Example (05 Aug 2024 10:00 PM)
    const date = new Date(timeStamp);
    let formattedDate = date.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    formattedDate = formattedDate.replace(/(AM|PM)/g, (match) => match.toUpperCase());
    return formattedDate;
}

export const pModes = { "Net Banking" : "netBanking", "UPI" : "upi", "Card" : "card", "Cash": "cash"}
