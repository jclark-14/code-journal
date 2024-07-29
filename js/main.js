'use strict';
const $imgUrl = document.querySelector('.img-url');
const $img = document.querySelector('img');
const $form = document.querySelector('form');
const $ul = document.querySelector('ul');
const $noEntries = document.querySelector('.no-entries');
if (!$imgUrl || !$img || !$form || !$ul || !$noEntries)
  throw new Error('$imgUrl, $img, $entries, $ul or $form query failed');
function writeJSON() {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}
$imgUrl.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  $img.setAttribute('src', $eventTarget.value);
});
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements;
  const entry = {
    title: $formElements.title.value,
    'img-url': $formElements['img-url'].value,
    notes: $formElements.notes.value,
    entryID: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.push(entry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  writeJSON();
});
// const entry = {
//   title: 'hello',
//   'img-url': 'jello',
//   notes: 'hello',
//   entryID: data.nextEntryId,
// };
// console.log(entry['img-url']);
function renderEntry(entry) {
  if (!$ul) throw new Error('ul not found');
  const $li = $ul.appendChild(document.createElement('li'));
  $li.setAttribute('class', 'row');
  const $imgDiv = $li.appendChild(document.createElement('div'));
  $imgDiv.setAttribute('class', 'img-div column-half');
  const $img = $imgDiv.appendChild(document.createElement('img'));
  $img.setAttribute('src', entry['img-url']);
  const $textDiv = $li.appendChild(document.createElement('div'));
  $textDiv.setAttribute('class', 'column-half');
  const $h3 = $textDiv.appendChild(document.createElement('h3'));
  $h3.setAttribute('class', 'entry-heading');
  $h3.innerHTML = entry.title;
  const $p = $textDiv.appendChild(document.createElement('p'));
  $p.setAttribute('class', 'entry-text');
  $p.innerHTML = entry.notes;
  console.log('$li', $li);
  return $li;
}
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    renderEntry(data.entries[i]);
  }
});
function toggleNoEntries($noEntries) {
  if ($noEntries.getAttribute('class')?.indexOf('hidden')) {
    $noEntries.setAttribute('class', 'no-entries');
  } else if (!$noEntries.getAttribute('class')?.indexOf('hidden')) {
    $noEntries.setAttribute('class', 'no-entries');
  }
}
console.log(toggleNoEntries);
const $entryForm = document.querySelector('#entry-form');
const $viewEntries = document.querySelector('#entries');
if (!$entryForm || !$viewEntries)
  throw new Error('$entryForm or $viewEntries query failed.');
console.log($entryForm.dataset.view);
console.log($viewEntries.dataset.view);
let view = 'entries' || 'entry-form';
function viewSwap(view) {
  if (view === $entryForm.dataset.view) {
    $viewEntries.setAttribute('class', 'hidden column-full');
    $entryForm.setAttribute('class', '');
  } else if (view === $viewEntries.dataset.view) {
    $entryForm.setAttribute('class', 'hidden');
    $viewEntries.setAttribute('class', 'column-full');
  }
  // data.view = view;
}
// view = 'entry-form';
// viewSwap(view);
const $navEntries = document.querySelector('.nav-entries');
if (!$navEntries) throw new Error('$navEntries query failed.');
$navEntries.addEventListener('click', () => {
  view = 'entries';
  viewSwap(view);
});
