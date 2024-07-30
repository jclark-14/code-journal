/* exported data */
interface Entry {
  title: string;
  'img-url': string;
  notes: string;
  entryID: number;
}

interface Data {
  view: string;
  entries: Entry[];
  editing: null | Entry;
  nextEntryId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function readJSON(): Data {
  const returnJSON = localStorage.getItem('data-storage');
  if (!returnJSON) {
    return data;
  } else {
    return JSON.parse(returnJSON);
  }
}

data = readJSON();
