export default function ChangeHandler(ev, setState) {
  const { name, value } = ev.target;
  return setState((prevState) => ({ ...prevState, [name]: value }));
}
