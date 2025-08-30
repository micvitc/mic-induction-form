const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';


export const saveFormData = async (formData:any) => {
  console.log('Saving form data:', formData);
  const response = await fetch(`${backendUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to save form data');
  }
}

export const getRegistrationCount = async () => {
  return 500;
}