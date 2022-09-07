// Convert Objects to form data (takes one object or many)
export function objectToFormData(...objects) {
  const formData = new FormData();
  objects.forEach((object) => {
    Object.keys(object).forEach((key) => {
      formData.append(key, object[key]);
    });
  });
  return formData;
}
