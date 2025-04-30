// src/services/authService.js
export const fakeAuth = {
    login(email, password) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Mock validation - in real app, this would be an API call
          if (email && password) {
            const token = 'fake-jwt-token-' + Math.random().toString(36).substr(2);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({
              email,
              name: email.split('@')[0], // Generate a simple name from email
              avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
            }));
            resolve({ success: true });
          } else {
            resolve({ success: false, error: 'Invalid credentials' });
          }
        }, 500); // Simulate network delay
      });
    },
    
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
    
    getUser() {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
  };