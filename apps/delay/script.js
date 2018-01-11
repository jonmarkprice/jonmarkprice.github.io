// First make basic skeleton to test speed.

// will have two elements a button and a display
const add = document.getElementById('add-entry');
const list = document.getElementById('entries');
const delayInput = document.getElementById('input');

const presets = [0, 100, 200, 500];
presets.forEach(function(delay) {
  list.appendChild(createEntry(delay));
});


add.onsubmit = function(event) {
  event.preventDefault();
  const delay = Number(delayInput.value) || 0;
  const entry = createEntry(delay);
  delayInput.value = ''; // Clear 
  list.appendChild(entry);
}

const clear = document.getElementById('clear');
clear.onclick = function() {
  while (list.children.length > 1) {
    list.removeChild(list.lastChild);
  }
}

const reset = document.getElementById('reset');
reset.onclick = function() {
  const entries = document.getElementById('entries').children;
  const pos = 2; // display is always the 2nd element
  const len = entries.length;
  for (let i = 1; i < len; i++) {
    let display = entries[i].children[pos];
    if (display.classList.contains('display')) {
      display.textContent = '';
    }
  }
}

function setDelay(display, delay) {
  return function() {
    display.textContent = '';
    const start = new Date();
    setTimeout(function() {
      const actual = new Date() - start;
      display.textContent = 'Done. (Actual ' + actual + ' ms).';
    }, delay);
  }
}

function createEntry(delay) {
  const entry   = document.createElement('tr');
  const display = document.createElement('td');
  const buttonField = document.createElement('td');
  const label   = document.createElement('td');
  const button  = document.createElement('button');
  button.onclick = setDelay(display, delay);
  button.textContent = 'Go';
  buttonField.appendChild(button);
  label.textContent = delay;
  display.classList.add('display');
  entry.appendChild(buttonField);
  entry.appendChild(label);
  entry.appendChild(display);
  return entry;
};


