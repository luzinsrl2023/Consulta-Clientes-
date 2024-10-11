import React, { useState, useRef } from 'react';
import { Search, Copy, FileDown, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';

interface Client {
  id: number;
  cuit: string;
  razonSocial: string;
  codigoCliente: string;
  saldo: number;
}

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Client[]>([]);
  const tableRef = useRef(null);

  // Simulated client data (replace with actual API call in production)
  const clients: Client[] = [
    { id: 1, cuit: '20-12345678-9', razonSocial: 'Empresa A', codigoCliente: 'CLI001', saldo: 5000 },
    { id: 2, cuit: '30-98765432-1', razonSocial: 'Empresa B', codigoCliente: 'CLI002', saldo: 7500 },
    { id: 3, cuit: '33-45678901-2', razonSocial: 'Empresa C', codigoCliente: 'CLI003', saldo: 3000 },
  ];

  const handleSearch = () => {
    const results = clients.filter(client =>
      client.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cuit.includes(searchTerm) ||
      client.codigoCliente.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleCopy = () => {
    const tableData = searchResults.map(client => 
      `${client.cuit}\t${client.razonSocial}\t${client.codigoCliente}\t${client.saldo}`
    ).join('\n');
    navigator.clipboard.writeText(tableData);
    alert('Datos copiados al portapapeles');
  };

  const handleDownloadPDF = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: 'resultados_clientes',
    onAfterPrint: () => alert('PDF descargado'),
  });

  const handleDownloadJPG = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'resultados_clientes.jpg';
        link.click();
      });
    }
  };

  const handleShareWhatsApp = () => {
    const tableData = searchResults.map(client => 
      `CUIT: ${client.cuit}, Razón Social: ${client.razonSocial}, Código: ${client.codigoCliente}, Saldo: $${client.saldo}`
    ).join('\n');
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(tableData)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Buscar cliente..."
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition duration-300"
          onClick={handleSearch}
        >
          <Search size={20} />
        </button>
      </div>
      {searchResults.length > 0 && (
        <>
          <div className="mb-4 flex space-x-2">
            <button onClick={handleCopy} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition duration-300 flex items-center">
              <Copy size={16} className="mr-2" /> Copiar
            </button>
            <button onClick={handleDownloadPDF} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 flex items-center">
              <FileDown size={16} className="mr-2" /> PDF
            </button>
            <button onClick={handleDownloadJPG} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 flex items-center">
              <FileDown size={16} className="mr-2" /> JPG
            </button>
            <button onClick={handleShareWhatsApp} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300 flex items-center">
              <Share2 size={16} className="mr-2" /> WhatsApp
            </button>
          </div>
          <div className="overflow-x-auto">
            <table ref={tableRef} className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">CUIT</th>
                  <th className="px-4 py-2">Razón Social</th>
                  <th className="px-4 py-2">Código Cliente</th>
                  <th className="px-4 py-2">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{client.cuit}</td>
                    <td className="px-4 py-2">{client.razonSocial}</td>
                    <td className="px-4 py-2">{client.codigoCliente}</td>
                    <td className="px-4 py-2">${client.saldo.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchComponent;