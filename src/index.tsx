import {render} from 'solid-js/web';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'virtual:windi.css';
import 'virtual:windi-devtools';

import '@mdi/font/css/materialdesignicons.min.css';

import App from './App';

render(() => <App/>, document.getElementById('root'));
