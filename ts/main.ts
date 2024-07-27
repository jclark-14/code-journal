/* global data */

const $imgUrl = document.querySelector('.img-url');
const $img = document.querySelector('img');
if (!$imgUrl || !$img) throw new Error('$imgUrl or $img query failed');

$imgUrl.addEventListener('input', (event: Event) => {
  const $eventTarget = event.target as HTMLFormElement;
  console.log($eventTarget);
  console.log('input event: ', event);
  console.log('event value: ', $eventTarget.value);
  $img.setAttribute('src', $eventTarget.value);
  console.log('src:', $img.getAttribute('src'));
});

console.log(data);
