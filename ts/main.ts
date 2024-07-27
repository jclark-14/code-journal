/* global data */
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  'img-url': HTMLInputElement;
  notes: HTMLTextAreaElement;
}

const $imgUrl = document.querySelector('.img-url') as HTMLFormElement;
const $img = document.querySelector('img');
const $form = document.querySelector('form');
if (!$imgUrl || !$img || !$form)
  throw new Error('$imgUrl, $img or !$form query failed');

function writeJSON(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}

$imgUrl.addEventListener('input', (event: Event) => {
  const $eventTarget = event.target as HTMLFormElement;
  $img.setAttribute('src', $eventTarget.value);
});

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = $form.elements as FormElements;
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
