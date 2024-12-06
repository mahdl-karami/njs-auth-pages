export default function submitHandler(ev, formType, formData) {
  ev.preventDefault();
  fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
}
