import React from 'react';
import { Users } from 'lucide-react';
import SearchComponent from './components/SearchComponent';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex items-center justify-center mb-6">
          <Users className="text-blue-500 w-12 h-12 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Consulta de Clientes</h1>
        </div>
        <p className="text-gray-600 text-center mb-6">
          Bienvenido a nuestra aplicación de consulta de clientes. Aquí podrás buscar y gestionar la información de tus clientes de manera eficiente.
        </p>
        <SearchComponent />
      </div>
    </div>
  );
}

export default App;