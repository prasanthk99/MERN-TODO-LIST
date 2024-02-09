// App.tsx
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import TodoList from './components/TodoList';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  const [token, setToken] = useState<string>('');

  if (!token) {
    return (
      <div className="App">
        <Routes>
          <Route path="/">
            {/* <Route index element={<TodoList token={token}/>} /> */}
            <Route index element={<LoginForm setToken={setToken} />} />
            <Route path="signup" element={<SignupForm />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </div>
    );
  }

  return (
    <div className="App">
      <TodoList token={token}/>
    </div>
  );
}

export default App;
