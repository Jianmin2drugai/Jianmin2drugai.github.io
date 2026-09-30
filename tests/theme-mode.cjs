const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('assets/js/theme-mode.js', 'utf8');

function setup({saved, dark = false, blocked = false} = {}) {
  const root = {}, attributes = {}, handlers = {};
  const media = {matches: dark, addEventListener: (_, fn) => { handlers.system = fn; }};
  const button = {
    hidden: true,
    setAttribute: (key, value) => { attributes[key] = value; },
    addEventListener: (_, fn) => { handlers.click = fn; }
  };
  let ready;
  vm.runInNewContext(source, {
    document: {
      documentElement: {
        setAttribute: (key, value) => { root[key] = value; },
        getAttribute: key => root[key]
      },
      querySelector: () => button,
      addEventListener: (_, fn) => { ready = fn; }
    },
    window: {matchMedia: () => media, dispatchEvent: () => {}},
    Event: function () {},
    localStorage: {
      getItem: () => { if (blocked) throw Error('blocked'); return saved; },
      setItem: (_, value) => { if (blocked) throw Error('blocked'); saved = value; }
    }
  });
  const initial = root['data-theme'];
  ready();
  return {root, attributes, handlers, media, button, initial, saved: () => saved};
}
let state = setup({dark: true});
assert.equal(state.initial, 'dark');
assert.equal(state.button.hidden, false);
state.media.matches = false;
state.handlers.system();
assert.equal(state.root['data-theme'], 'light');
state.handlers.click();
assert.equal(state.saved(), 'dark');
assert.equal(state.attributes['aria-pressed'], 'true');
state.handlers.system();
assert.equal(state.root['data-theme'], 'dark');
assert.equal(setup({saved: state.saved()}).initial, 'dark');
assert.equal(setup({saved: 'light', dark: true}).initial, 'light');
assert.equal(setup({saved: 'invalid', dark: true}).initial, 'dark');
state = setup({blocked: true});
state.handlers.click();
assert.equal(state.root['data-theme'], 'dark');
assert.equal(state.attributes['aria-label'], 'Switch to light mode');
console.log('Theme preference, persistence, system changes, and blocked-storage checks passed.');
