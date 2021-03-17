export function getMenus({ headings }) {
  const h2Headings = headings.filter(heading => heading.depth === 2)

  return h2Headings.map(({ id, value }) => new Menu(id, value))
}

export class Menu {
  static menuEls = []

  _id = ''
  _value = ''
  _el = null

  constructor(id, value) {
    this._value = value
    this._id = id
    this._el = Array.prototype.find.call(Menu.menuEls, el => el.id === this._id)
  }

  get title() {
    return this._value
  }

  get element() {
    return this._el
  }

  get offsetTop() {
    return this._el.offsetTop
  }
}
