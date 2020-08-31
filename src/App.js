import React, { createContext, useState } from 'react';
import Views from 'views';

const AppContext = createContext();

function App() {
  const [user, setUser] = useState({})

  return (
    <AppContext.Provider
      value={{
        user,
        setUser
      }}
    >
      <Views />
    </AppContext.Provider>
  );
}

export default App;
export {
  AppContext
}
