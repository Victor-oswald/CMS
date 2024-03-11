document.addEventListener('DOMContentLoaded', function () {
    let themeURL = new URLSearchParams(window.location.search);
    let theme = themeURL.get('theme');
    console.log(theme);
    let content = document.getElementById('themes');
    content.querySelector('iframe').src = theme;
    let iframe = document.getElementById('template');
    let hasChanged = false;
    let editedContent = '';

    iframe.addEventListener('load', function () {
        var iframeDoc = this.contentDocument || this.contentWindow.document;
        iframeDoc.body.contentEditable = 'true';

        var observer = new MutationObserver(function (mutations) {
            console.log('Content Changed');
            hasChanged = true;
            editedContent = iframeDoc.documentElement.outerHTML;
        });
        observer.observe(iframeDoc, {
            childList: true,
            subtree: true,
            characterData: true,
            characterDataOldValue: true
        });
    });

    window.addEventListener('beforeunload', function (e) {
        if (hasChanged) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes, are you sure you want to leave?'
        }
    });

    document.getElementById('save').addEventListener('click', async function (e) {
        if (!hasChanged) {
            e.preventDefault();
            alert('You have not made any changes to this template.');
        } else {
            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            
            iframeDoc.querySelectorAll('[contenteditable="true"]').forEach(function(element) {
                element.removeAttribute('contenteditable');
            });
                        
            let url = `../API/handleRequests/save_theme.php`;
            let save = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content: editedContent}),
            });
            let data = await save.json();
            alert(data.message);
        }
    });
});
