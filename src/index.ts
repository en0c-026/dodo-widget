import { h, render } from 'preact';
import { App } from './App';
import loader from './loader';
import { Configurations } from './models';

/**
 * Default configurations that are overridden by
 * parameters in embedded script.
 */
const defaultConfig: Configurations = {
    debug: false,
    dodoBaseUrl: 'https://dodo-route.dodoex.io/dodoapi',
    cGeckoBaseUrl: '',
    targetId: ''
};

// main entry point - calls loader and render Preact app into supplied element
loader(
    window,
    defaultConfig,
    window.document.currentScript,
    (el, config) => render(h(App, { ...config, element: el }), el));
