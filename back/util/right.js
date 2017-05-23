// by default admin can do anything

// read: public accessible if null
// edit: external inaccessible (api) if null

exports.readFilter = (select, right, lvl) => {
  return select ?
    Object.keys(right)
      .filter(e => select ?
          select.indexOf(e) > -1 &&
          (!right[e].read || right[e].read <= lvl)
          : !right[e].read || right[e].read <= lvl
      ).join(' ') + ' '
    : Object.keys(right).join(' ') + ' '
}

exports.editFilter = (body, right, lvl) => {
  if (!body || !Object.keys(body).length)
    return null
  let filtered = {}
  Object.keys(body).forEach(e => {
    // leave validation to db schema for now
    if (right[e].edit && right[e].edit <= lvl)
      filtered[e] = body[e]
  })
  return Object.keys(filtered).length ? filtered : null
}
