'use client';

import { useState } from 'react';

interface RegistrarMovimientoModalProps {
  isOpen: boolean;  
  onClose: () => void;
  onSubmit: (movimiento: {
    recibidoPor: string;
    almacenId: number;
    tipoTarimaId: number;
    tipoMovimiento: string;
    cantidad: number;
  }) => void;
  
}

export default function AddMovimientosModal({
  isOpen,
  onClose,
  onSubmit,
}: RegistrarMovimientoModalProps) {
  const [recibidoPor, setRecibidoPor] = useState('');
  const [almacenId, setAlmacenId] = useState<number>(1);
  const [tipoTarimaId, setTipoTarimaId] = useState<number>(1);
  const [tipoMovimiento, setTipoMovimiento] = useState('entrada');
  const [cantidad, setCantidad] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      recibidoPor,
      almacenId,
      tipoTarimaId,
      tipoMovimiento,
      cantidad,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Registrar Movimiento</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Recibido por:</label>
            <input
              type="text"
              value={recibidoPor}
              onChange={(e) => setRecibidoPor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Almacén:</label>
            <select
              value={almacenId}
              onChange={(e) => setAlmacenId(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value={1}>Ciudad de México</option>
              <option value={2}>Guadalajara</option>
              <option value={3}>Morelos</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tipo de tarima:</label>
            <select
              value={tipoTarimaId}
              onChange={(e) => setTipoTarimaId(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value={1}>Madera</option>
              <option value={2}>Plástico</option>
              <option value={3}>Metálica</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tipo de movimiento:</label>
            <select
              value={tipoMovimiento}
              onChange={(e) => setTipoMovimiento(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Cantidad:</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#7888ec] text-white px-4 py-2 rounded-md hover:bg-[#5969cd]"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}