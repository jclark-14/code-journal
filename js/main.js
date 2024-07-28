'use strict';
const $imgUrl = document.querySelector('.img-url');
const $img = document.querySelector('img');
const $form = document.querySelector('form');
if (!$imgUrl || !$img || !$form)
  throw new Error('$imgUrl, $img or !$form query failed');
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
