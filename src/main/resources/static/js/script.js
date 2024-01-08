document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: formData
      });
      const message = document.getElementById('loginMessage');

      if (response.ok) {
        message.innerText = 'Login Successful';
        message.style.color = 'green';
      } else if (response.status === 401) {
        message.innerText = 'Login Failed';
        message.style.color = 'red';
      } else {
        message.innerText = 'Server Error';
        message.style.color = 'red';
      }
    } catch (error) {
      console.error('An unexpected error happened:', error);
      const message = document.getElementById('loginMessage');
      message.innerText = 'Network Error';
      message.style.color = 'red';
    }
  });
  
  document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        alert('Registration Successful');
      } else {
        alert('Registration Failed');
      }
    } catch (error) {
      console.error('An unexpected error happened:', error);
      alert('Network Error');
    }
  });