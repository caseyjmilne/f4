export const genId = () => '_' + Math.random().toString(36).substr(2, 9);

export const withIds = (arr) =>
  arr.map((c) => (c.id ? c : { ...c, id: genId() }));
