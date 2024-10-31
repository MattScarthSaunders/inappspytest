class InAppBrowserDetector {

    inAppRegExps = [
        'WebView',
        '(iPhone|iPod|iPad)(?!.*Safari/)', // Apple devices but not with 'Safari/' following
        'Android.*wv\\)',
        'FB_\\w|FB\\w', // Match Facebook FB_ or FB then word char
    ];

    inappRegex = new RegExp(`${this.inAppRegExps.map(reg => `(${reg})`).join('|')}`, 'ig');

    get isInAppBrowser() {
        const userAgent = this.getUserAgent();
        return this.inappRegex.test(userAgent);
    }

    redirect() {
        try {
            const utms = [
                ['utm_source', localStorage.getItem('utm_source')],
                ['utm_medium', localStorage.getItem('utm_medium')],
                ['utm_campaign', localStorage.getItem('utm_campaign')],
                ['utm_content', localStorage.getItem('utm_content')]
            ];

            const utmStrings = utms.filter(utm => utm[1]).map(utm => utm.join('='));
            const queryParams = utmStrings.length > 0 ? `?${utmStrings.join('&')}` : '';
            const userAgent = this.getUserAgent();

            if (userAgent === '') {
                setTestHTML(`useragent is empty, you shouldn't see this.`)
                return;
            }

            if (!this.isiOS(userAgent)) {
                setTestHTML(`is not ios. useragent: ${userAgent}`)
                window.location.href = `intent:https://nodescript.dev/signup${queryParams}#Intent;end`;
            } else {
                setTestHTML(`is ios. useragent: ${userAgent}`)
                window.location.href = `x-safari-https://nodescript.dev/signup${queryParams}`;
            }
        } catch (_err) {
            // if redirect fails for any reason, backup should be existing user experience
        }
    }

    isiOS(userAgent) {
        const appleUAStrings = [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod',
        ];
        const isiOS13Ipad = window && window.document && userAgent.includes('Mac') && 'ontouchend' in window.document;
        return appleUAStrings.includes(userAgent) || isiOS13Ipad;
    };

    getUserAgent() {
        if (typeof window !== 'undefined') {
            const ua =
            window?.navigator?.userAgent ||
            window?.navigator?.vendor ||
            // @ts-expect-error opera can exist on window
            window?.opera;
            return ua ?? '';
        }
        return '';
    };

}

// paste class above this line, remove typescript bits.

function setTestHTML(inner) {
    const div = document.getElementById('test')
    div.innerHTML = inner
}
localStorage.setItem('utm_source','test')

// use class below this line
const iabd = new InAppBrowserDetector()
if (iabd.isInAppBrowser) {
    iabd.redirect()
} else {
    setTestHTML('No in-app browser detected, you should be able to use google logins!')
}
