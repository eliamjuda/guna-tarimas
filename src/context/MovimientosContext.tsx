'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Movimiento {
  id: number;
  recibidoPor: string;
  almacenId: number;
  tipoTarimaId: number;
  tipoMovimiento: string;
  cantidad: number;
  fechaHora: string;
  almacen: {
    id: number;
    nombre: string;
  };
  tipotarima: {
    id: number;
    nombre: string;
  };
}

interface MovimientosContextType {
  movimientos: Movimiento[];
  totalTarimas: number;
  tarimasPorTipo: { [key: string]: number }; // Objeto para almacenar tarimas por tipo
  loading: boolean;
  error: string | null;
  agregarMovimiento: (movimiento: Movimiento) => void;
}

const MovimientosContext = createContext<MovimientosContextType | undefined>(undefined);

export const MovimientosProvider = ({ children }: { children: ReactNode }) => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [totalTarimas, setTotalTarimas] = useState<number>(0);
  const [tarimasPorTipo, setTarimasPorTipo] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para calcular tarimas por tipo
  const calcularTarimasPorTipo = (movimientos: Movimiento[]) => {
    const tarimasPorTipo: { [key: string]: number } = {};

    movimientos.forEach((mov) => {
      const tipo = mov.tipotarima.nombre;
      if (!tarimasPorTipo[tipo]) {
        tarimasPorTipo[tipo] = 0;
      }
      tarimasPorTipo[tipo] +=
        mov.tipoMovimiento === 'entrada' ? mov.cantidad : -mov.cantidad;
    });

    return tarimasPorTipo;
  };

  // Cargar movimientos iniciales al montar el componente
  useEffect(() => {
    const cargarMovimientos = async () => {
      try {
        const response = await fetch('/api/movimientos');
        if (!response.ok) {
          throw new Error('Error al cargar movimientos');
        }
        const data = await response.json();
        console.log("Movimientos cargados:", data);
        setMovimientos(data);

        // Calcular el total de tarimas
        const total = data.reduce((acc: number, mov: Movimiento) => {
          return mov.tipoMovimiento === 'entrada' ? acc + mov.cantidad : acc - mov.cantidad;
        }, 0);
        setTotalTarimas(total);

        // Calcular tarimas por tipo
        const tarimasPorTipo = calcularTarimasPorTipo(data);
        setTarimasPorTipo(tarimasPorTipo);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    cargarMovimientos();
  }, []);

  const agregarMovimiento = (movimiento: Movimiento) => {
    setMovimientos((prev) => [...prev, movimiento]); // Agrega el nuevo movimiento

    // Actualizar el total de tarimas
    setTotalTarimas((prev) =>
      movimiento.tipoMovimiento === 'entrada' ? prev + movimiento.cantidad : prev - movimiento.cantidad
    );

    // Actualizar tarimas por tipo
    setTarimasPorTipo((prev) => {
      const tipo = movimiento.tipotarima.nombre;
      const cantidad = movimiento.tipoMovimiento === 'entrada' ? movimiento.cantidad : -movimiento.cantidad;
      return {
        ...prev,
        [tipo]: (prev[tipo] || 0) + cantidad,
      };
    });
  };

  return (
    <MovimientosContext.Provider
      value={{ movimientos, totalTarimas, tarimasPorTipo, loading, error, agregarMovimiento }}
    >
      {children}
    </MovimientosContext.Provider>
  );
};

export const useMovimientos = () => {
  const context = useContext(MovimientosContext);
  if (!context) {
    throw new Error('useMovimientos debe usarse dentro de un MovimientosProvider');
  }
  return context;
};