async function fetchThemes() {
    try {
        console.log('Fetching themes...');
        let url = '../API/templates/render_templates.php';
        const response = await fetch(url, {
            method: 'POST',
        });
        console.log('Themes fetched successfully.');
        const data = await response.text();

        var section = document.getElementById('themes');
        var iframes = Array.from(section.querySelectorAll('img'));
        console.log(iframes.length);
        console.log('Manipulating iframes based on fetched data...');

        iframes.forEach((iframe) => {
            var overlay = document.createElement('div');
            overlay.classList.add('overlay');

            var viewOption = document.createElement('button');
            viewOption.textContent = 'View Theme';
            viewOption.addEventListener('click', () => {
                alert('view Theme clicked');
            });

            var useOption = document.createElement('button');
            useOption.textContent = 'Use Theme';
            useOption.addEventListener('click', (event) => {
                let source = iframe.getAttribute('src');
                let url = `editor.html?theme=${source}`;
                window.location.href = url;
            });

            overlay.appendChild(viewOption);
            overlay.appendChild(useOption);

            section.appendChild(overlay);

            overlay.style.display = 'none';

            overlay.style.position = 'absolute';
            overlay.style.top = iframe.offsetTop + 'px';
            overlay.style.left = iframe.offsetLeft + 'px';
            overlay.style.width = iframe.offsetWidth + 'px';
            overlay.style.height = iframe.offsetHeight + 'px';

            iframe.addEventListener('mouseenter', () => {
                overlay.style.display = 'block';
            });

            iframe.addEventListener('mouseleave', () => {
                overlay.style.display = 'none';
            });
        });

        console.log('Iframes manipulation completed.');
        return data;
    } catch (error) {
        console.error('Error fetching themes:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchThemes();
});

function setCookieConsent(consentGiven) {
    document.cookie = "cookieConsent=" + consentGiven + "; path=/; expires=Fri,   31 Dec   9999   23:59:59 GMT";
}

function getCookieConsent() {
    let allCookies = document.cookie;
    let ca = allCookies.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf("cookieConsent=") == 0) {
            return c.substring("cookieConsent=".length, c.length);
        }
    }
    return false;
}

function manageCookieConsent() {
    let consentGiven = getCookieConsent();
    if (consentGiven) {
        setCookieConsent(false);
        alert("Cookie consent withdrawn.");
    } else {
        setCookieConsent(true);
        alert("Cookie consent given.");
    }
    document.getElementById('cookieConsentBanner').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    if (!getCookieConsent()) {

        document.getElementById('cookieConsentBanner').style.display = 'block';
    } else {
        // Proceed with setting or reading cookies
    }
});
