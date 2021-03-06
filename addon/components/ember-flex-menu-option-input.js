import Ember from 'ember';
import { keyDown } from 'ember-keyboard';

const {
  TextField,
  getProperties,
  isPresent,
  typeOf
} = Ember;

const { run: { next } } = Ember;

export default TextField.extend({
  attributeBindings: ['columnIndex:data-column-index', 'rowIndex:data-row-index'],
  classNames: ['ember-flex-menu-option-input'],
  hook: 'ember_flex_menu_option_input',

  init(...args) {
    this._super(...args);

    const { acceptKeys, cancelKeys } = getProperties(this, 'acceptKeys', 'cancelKeys');

    if (isPresent(acceptKeys)) { acceptKeys.forEach((key) => this.on(keyDown(key), (event) => this._accept(event))); }
    if (isPresent(cancelKeys)) { cancelKeys.forEach((key) => this.on(keyDown(key), (event) => this._cancel(event))); }
  },

  didInsertElement(...args) {
    this._super(...args);

    next(() => this.$().focus());
  },

  focusIn(...args) {
    this._super(...args);

    this._tryFunction(this.attrs.gainedFocus);
  },

  focusOut(...args) {
    this._super(...args);

    this._tryFunction(this.attrs.lostFocus);
  },

  _accept() {
    this._tryFunction(this.attrs.choose);
    this._tryFunction(this.attrs.lostFocus);
  },

  _cancel() {
    this._tryFunction(this.attrs.lostFocus);
  },

  _tryFunction(fn) {
    if (typeOf(fn) === 'function') { fn(); }
  }
});
