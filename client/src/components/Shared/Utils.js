export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export function getUniqueArray(array, key) {
    if (typeof key !== 'function') {
      const property = key;
      key = function(item) { return item[property]; };
    }
    return Array.from(array.reduce(function(map, item) {
      const k = key(item);
      if (!map.has(k)) map.set(k, item);
      return map;
    }, new Map()).values());
}


export function useQueryParams() {
  const params = new URLSearchParams(
    window ? window.location.search : {}
  );

  return new Proxy(params, {
      get(target, prop) {
          return target.get(prop)
      },
  });
}