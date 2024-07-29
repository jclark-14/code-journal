/* global data */
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  'img-url': HTMLInputElement;
  notes: HTMLTextAreaElement;
}

const $imgUrl = document.querySelector('.img-url') as HTMLFormElement;
const $img = document.querySelector('img');
const $form = document.querySelector('form');
const $ul = document.querySelector('ul');
const $noEntries = document.querySelector('.no-entries');
const $entryForm = document.querySelector('#entry-form') as HTMLElement;
const $viewEntries = document.querySelector('#entries') as HTMLElement;

if (!$imgUrl || !$img || !$form || !$ul || !$noEntries)
  throw new Error(
    '$imgUrl, $img, $entries, $ul, $entryForm, $viewEntries or $form query failed',
  );

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
  data.view = 'entries';
  writeJSON();
  $ul.prepend(renderEntry(entry));
  viewSwap(data);
  toggleNoEntries($noEntries);
});

function renderEntry(entry: Entry): HTMLLIElement {
  if (!$ul) throw new Error('ul not found');

  const $li = $ul.appendChild(document.createElement('li'));
  $li.setAttribute('class', 'row');

  const $imgDiv = $li.appendChild(document.createElement('div'));
  $imgDiv.setAttribute('class', 'img-div column-half no-padding-left');

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
  return $li;
}

function toggleNoEntries($noEntries: Element): void {
  if (data.entries[0] !== undefined) {
    $noEntries.setAttribute('class', 'no-entries hidden');
  } else if (data.entries[0] === undefined) {
    $noEntries.setAttribute('class', 'no-entries');
  }
}

if (!$entryForm || !$viewEntries)
  throw new Error('$entryForm or $viewEntries query failed.');

function viewSwap(data: Data): void {
  if (data.view === $entryForm.dataset.view) {
    $viewEntries.setAttribute('class', 'hidden column-full');
    $entryForm.setAttribute('class', '');
  } else if (data.view === $viewEntries.dataset.view) {
    $entryForm.setAttribute('class', 'hidden');
    $viewEntries.setAttribute('class', 'column-full');
  }
}

const $navEntries = document.querySelector('.nav-entries');
if (!$navEntries) throw new Error('$navEntries query failed.');
$navEntries.addEventListener('click', () => {
  toggleNoEntries($noEntries);
  data.view = 'entries';
  writeJSON();
  viewSwap(data);
});

const $new = document.querySelector('.new');
if (!$new) throw new Error('$new query failed.');
$new.addEventListener('click', () => {
  data.view = 'entry-form';
  writeJSON();
  viewSwap(data);
});

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    renderEntry(data.entries[i]);
  }
  toggleNoEntries($noEntries);
  viewSwap(data);
});
