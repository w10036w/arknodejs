export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}
export function ellipsis (str, len=50) {
  const suffix = str.length>len ? '...' : ''
  return str.slice(0, len) + suffix
}

export function fileName (url) {
  return url.substr(url.lastIndexOf('/') + 1)
}

export function ts2timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' min')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hr')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function std2timeAgo (time) {
  return ts2timeAgo(new Date(time).getTime()/1000)
}

// ip: Sun Jan 01 2017 17:20:24 GMT+0800 (SGT)
// op: 10:30 Sun 01 Jan 2017
export function ts2hiDdmy (ts) {
  if (!ts) return ''
  const s = new Date(ts).toString();
  return s.substr(16, 5) +', '+ //10:30
    //s.substr(0, 3), // Sun
    s.substr(8, 3)+' '+ // 01
    s.substr(4, 4)+' '+ // Jan
    s.substr(11, 4); // 2017
}
export function std2hiDdmy (time) {
  if (!time) return ''
  return ts2hiDdmy(new Date(time).getTime())
}

export function fmtNum (n) {
  if (n<1000) return n
  if (n>1000000) return `${(n/1000000).toFixed(1)}m`
  let sn = n/1000
  if (sn<10) return sn.toFixed(2) + 'k'
  if (sn<100) return sn.toFixed(1) + 'k'
  return Math.floor(sn) + 'k'
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
