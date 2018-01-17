import './styles.scss';

Array.from(document.querySelectorAll('#options-sort button')).forEach((button) => {
  button.addEventListener('click', function toggle() {
    document.querySelectorAll('#options-sort button').setAttribute('aria-selected', false);

    if (this.getAttribute('aria-selected') === 'true') {
      this.setAttribute('aria-selected', false);
    } else {
      this.setAttribute('aria-selected', true);
    }
  });
});

/*
  TODO: delete this comment

  This file is where you bootstrap your JS code
  For example import stuff here:

  import {select} from 'd3-selection';
  import myComponent from './components/my-component';

  Split logical parts of you project into components e.g.

  /client
    - /components
        - /component-name
            - styles.scss
            - index.js
            - template.html

  If you want to import some data, just import it like normal:

  import myData from './data.csv';

  `myData` will be a string that you can then parse into an object using, for example, d3.csvParse()

  You can import CSV, TSV, TXT, XML and JSON this way! Note, however, that it will increase your
  bundle size, which may increase the time to first render in some cases!
*/
