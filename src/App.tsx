import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';

function App() {
  return (
    <div className="App">
      <RegistrationPage onRegister={() => Promise.resolve(true)} />
    </div>
  );
}

export default App;
