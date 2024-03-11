function setIframeSources() {
 var section = document.getElementById('themes');
 var img = document.createElement('img');
 var overlay = document.createElement('div');
 overlay.classList.add('overlay--container');
 img.src = '../API/templates/img_templates/img3.png';
 overlay.appendChild(img);
 section.appendChild(overlay);
 var section = document.getElementById('themes');
 var img = document.createElement('img');
 var overlay = document.createElement('div');
 overlay.classList.add('overlay--container');
 img.src = '../API/templates/img_templates/temp1.png';
 overlay.appendChild(img);
 section.appendChild(overlay);
 var section = document.getElementById('themes');
 var img = document.createElement('img');
 var overlay = document.createElement('div');
 overlay.classList.add('overlay--container');
 img.src = '../API/templates/img_templates/temp2.png';
 overlay.appendChild(img);
 section.appendChild(overlay);
}
 document.addEventListener('DOMContentLoaded', setIframeSources);
