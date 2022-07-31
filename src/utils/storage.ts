const name = ``;

function LgetItem(key: string) {
  let value = localStorage.getItem(name + key);
  return JSON.parse(value!);
}

function LsetItem(key: string, value: any) {
  localStorage.setItem(name + key, JSON.stringify(value));
}

function LreItem(key: string) {
  localStorage.removeItem(name + key);
}

function SgetItem(key: string) {
  let value = sessionStorage.getItem(name + key);
  return JSON.parse(value!);
}

function SsetItem(key: string, value: any) {
  sessionStorage.setItem(name + key, JSON.stringify(value));
}

function SreItem(key: string) {
  sessionStorage.removeItem(name + key);
}

export { LgetItem, LsetItem, LreItem, SgetItem, SsetItem, SreItem };
