'use strict';
const $imgUrl = document.querySelector('.img-url');
const $img = document.querySelector('img');
const $form = document.querySelector('form');
const $ul = document.querySelector('ul');
const $noEntries = document.querySelector('.no-entries');
const $entryForm = document.querySelector('#entry-form');
const $viewEntries = document.querySelector('#entries');
const $h1 = document.querySelector('h1');
const $delete = document.querySelector('.delete');
const $dialog = document.querySelector('dialog');
const $cancel = document.querySelector('.modal-cancel');
const $confirm = document.querySelector('.modal-confirm');
if (
  !$imgUrl ||
  !$img ||
  !$form ||
  !$ul ||
  !$noEntries ||
  !$h1 ||
  !$delete ||
  !$dialog ||
  !$cancel ||
  !$confirm
)
  throw new Error('query failed');
function writeJSON() {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}
$imgUrl.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  $img.setAttribute('src', $eventTarget.value);
});
$form.addEventListener('submit', (event) => {
  if (!data.editing) {
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
    data.view = 'entries';
    writeJSON();
    $ul.prepend(renderEntry(entry));
    viewSwap(data);
    toggleNoEntries($noEntries);
  } else {
    event.preventDefault();
    const $formElements = $form.elements;
    const entry = {
      title: $formElements.title.value,
      'img-url': $formElements['img-url'].value,
      notes: $formElements.notes.value,
      entryID: data.nextEntryId,
    };
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
    data.view = 'entries';
    entry.entryID = data.editing.entryID;
    for (let i = 0; i < data.entries.length; i++) {
      const $replaceId = data.entries[i].entryID;
      if ($replaceId === entry.entryID) {
        data.entries.splice(i, 1, entry);
      }
    }
    const $liElements = document.querySelectorAll('li');
    if (!$liElements) throw new Error('$liElements query failed');
    for (let i = 0; i < $liElements.length; i++) {
      if (Number($liElements[i].dataset.entryId) === entry.entryID) {
        $liElements[i].replaceWith(renderEntry(entry));
      }
    }
    writeJSON();
    viewSwap(data);
    toggleNoEntries($noEntries);
    $h1.innerHTML = 'New Entry';
    data.editing = null;
  }
});
function renderEntry(entry) {
  if (!$ul) throw new Error('$ul not found');
  const $li = $ul.appendChild(document.createElement('li'));
  $li.setAttribute('class', 'row column-full');
  $li.setAttribute('data-entry-id', entry.entryID.toString());
  const $imgDiv = $li.appendChild(document.createElement('div'));
  $imgDiv.setAttribute('class', 'img-div column-half');
  const $img = $imgDiv.appendChild(document.createElement('img'));
  $img.setAttribute('src', entry['img-url']);
  const $textDiv = $li.appendChild(document.createElement('div'));
  $textDiv.setAttribute('class', 'column-half text-div');
  const $h3PencilDiv = $textDiv.appendChild(document.createElement('div'));
  $h3PencilDiv.setAttribute('class', 'row h3-icon');
  const $h3 = $h3PencilDiv.appendChild(document.createElement('h3'));
  $h3.setAttribute('class', 'entry-heading');
  $h3.innerHTML = entry.title;
  const $aPencil = $h3PencilDiv.appendChild(document.createElement('a'));
  $aPencil.setAttribute('class', 'pencil');
  $aPencil.setAttribute('href', '#');
  const $iPencil = $aPencil.appendChild(document.createElement('i'));
  $iPencil.setAttribute('class', 'fa-solid fa-pencil fa-lg');
  const $p = $textDiv.appendChild(document.createElement('p'));
  $p.setAttribute('class', 'entry-text');
  $p.innerHTML = entry.notes;
  return $li;
}
function toggleNoEntries($noEntries) {
  if (data.entries[0] !== undefined) {
    $noEntries.setAttribute('class', 'no-entries hidden');
  } else if (data.entries[0] === undefined) {
    $noEntries.setAttribute('class', 'no-entries');
  }
}
if (!$entryForm || !$viewEntries)
  throw new Error('$entryForm or $viewEntries query failed.');
function viewSwap(data) {
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
  data.editing = null;
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $h1.innerHTML = 'New Entry';
  $delete?.setAttribute('class', 'delete hidden');
});
$ul.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  if ($eventTarget.tagName === 'I') {
    const $targetId = $eventTarget.closest('LI')?.getAttribute('data-entry-id');
    const $targetIdNumber = Number($targetId);
    const $entryJSON = localStorage.getItem('data-storage');
    const $returnStorage = JSON.parse($entryJSON);
    for (let i = 0; i < $returnStorage.entries.length; i++) {
      const $entryId = $returnStorage.entries[i].entryID;
      if ($entryId === $targetIdNumber) {
        data.editing = $returnStorage.entries[i];
      }
    }
    const $formElements = $form.elements;
    if (!data.editing) throw new Error('Entry not found');
    $formElements.title.value = data.editing.title;
    $formElements['img-url'].value = data.editing['img-url'];
    $img.setAttribute('src', data.editing['img-url']);
    $formElements.notes.value = data.editing.notes;
    $h1.innerHTML = 'Edit Entry';
    data.view = 'entry-form';
    viewSwap(data);
    $delete?.setAttribute('class', 'delete');
  }
});
$delete.addEventListener('click', () => {
  $dialog.showModal();
});
$cancel.addEventListener('click', () => {
  $dialog.close();
});
$confirm.addEventListener('click', () => {
  const $liElements = document.querySelectorAll('li');
  for (let i = 0; i < data.entries.length; i++) {
    if (data.editing?.entryID === data.entries[i].entryID) {
      data.entries.splice(i, 1);
    }
  }
  for (let i = 0; i < $liElements.length; i++) {
    if (Number($liElements[i].dataset.entryId) === data.editing?.entryID) {
      $liElements[i].remove();
    }
  }
  toggleNoEntries($noEntries);
  $dialog.close();
  data.view = 'entries';
  viewSwap(data);
  writeJSON();
});
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    renderEntry(data.entries[i]);
  }
  toggleNoEntries($noEntries);
  viewSwap(data);
});
