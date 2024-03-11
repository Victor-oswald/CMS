document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('addBTN');
    button.addEventListener('click', function () {
        document.getElementById('tools').style.height = '40%';
    })
    let offsetX, offsetY;

    button.addEventListener('dragstart', function (event) {
        offsetX = event.clientX - button.getBoundingClientRect().left;
        offsetY = event.clientY - button.getBoundingClientRect().top;

        event.dataTransfer.setData('text/plain', '');

        button.style.cursor = 'grabbing';
    });

    button.addEventListener('dragend', function (event) {
        button.style.cursor = 'pointer';
    });

    document.addEventListener('dragover', function (event) {
        event.preventDefault();
    });

    document.addEventListener('drop', function (event) {
        event.preventDefault();

        const dropX = event.clientX - offsetX;
        const dropY = event.clientY - offsetY;

        button.style.left = dropX + 'px';
        button.style.top = dropY + 'px';
    });
});

const divs = document.querySelectorAll('#tools > div');
const parentContainer = document.getElementById('tools');

function replaceContent(event) {
    event.preventDefault();

    parentContainer.innerHTML = '';
    let button = event.target.innerHTML;
    switch(button){
        case 'Add Text Box':
            console.log(button);
            parentContainer.innerHTML=document.getElementById('text-box-content').innerHTML;
            break;
    }
console.log(document.getElementById('text-box-content').innerHTML);
   // parentContainer.innerHTML = event.target.innerHTML;
}

divs.forEach(div => {
    div.addEventListener('click', replaceContent);
});


document.getElementById('contentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const contentType = document.getElementById('contentType').value;
    const contentInput = document.getElementById('contentInput').value;

    const iframe = document.getElementById('template');
    const iframeContentWindow = iframe.contentWindow;

    iframeContentWindow.focus();

    switch (contentType) {
        case 'header':
            iframeContentWindow.document.execCommand('insertHTML', false, `<h1>${contentInput}</h1>`);
            break;
        case 'paragraph':
            iframeContentWindow.document.execCommand('insertHTML', false, `<p>${contentInput}</p>`);
            break;
        case 'footer':
            iframeContentWindow.document.execCommand('insertHTML', false, `<footer>${contentInput}</footer>`);
            break;
        default:
            console.error('Invalid content type');
    }

    document.getElementById('contentInput').value = '';
});

if (self.settings && self.settings.focusOnLoad) {
    self.frames.addEventListener('readystatechange', function () {
        if (self.frames.readyState == 'complete') {
            self.editorIframeDocument.body.focus();
        }
    });
}

var node = document.querySelector("div"),
    textNode = node.firstChild,
    caret = textNode.length,
    range = document.createRange(),
    sel = window.getSelection();

node.focus();

range.setStart(textNode, caret);
range.setEnd(textNode, caret);

sel.removeAllRanges();
sel.addRange(range);

