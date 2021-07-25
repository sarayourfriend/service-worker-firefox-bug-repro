# Firefox Service Worker Waiting Bug Reproduction

## Steps to reproduce

1. Serve the site. The `serve.py` script is provided for convenience (`./serve.py`).
1. Visit the site.
1. Ensure that the service worker is registered by opening the developer tools and going to the "Application" tab and selecting the "Service Workers" option in the sidebar. Note the currently executing service worker and inspect the code by clicking on `service-worker.js`.
1. Make an arbitrary change to `service-worker.js` like adding a `console.log('hello')` to the `fetch` handler.
1. Reload the window.
1. In the "Service Workers" dev tools note that there are now two `service-worker.js` entries, one "Executing" and another "Installed".
1. Inspect the "Executing" `service-worker.js` and note that it is still the same as the previous script (does not include your change). This is the expected behavior according to the spec.
1. Close the tab.
1. Revisit the page and open the developer tools again to the "Service Workers" pane.
1. Note that now there is only a single `service-worker.js` entry and it is executing.
1. Inspect the code again by clicking on the `service-worker.js` link.

## Expected behavior

The service worker should be running the latest code, the one with the changes you made.

## Actual behavior

The service worker being executed is still the original service worker. The new service worker entered the "waiting" stage but then was discarded (?).