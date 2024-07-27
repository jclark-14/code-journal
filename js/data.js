'use strict';
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
function readJSON() {
  const returnJSON = localStorage.getItem('data-storage');
  if (!returnJSON) {
    return data;
  } else {
    return JSON.parse(returnJSON);
  }
}
data = readJSON();
