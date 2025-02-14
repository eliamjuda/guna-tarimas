'use client';
import { InfoCard } from "./components/InfoCard";
import styles from '@/app/ui/dashboard.module.css';
import InventoryTable from "./components/InventoryTable";
import AddMovimientosModal from "./components/AddMovimientosModal";
import { useState } from 'react';
import { useMovimientos } from "@/context/MovimientosContext";
import Notification from "./components/Notificacion";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { agregarMovimiento, totalTarimas, tarimasPorTipo } = useMovimientos();
  

  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const tarimaColors: { [key: string]: string } = {
    total: '#3749bb', 
    "Plastico": '#1db886',  
    "Madera": '#ab791b',     
    "Metalica": '#a3a5a5',     
  };

  const handleSubmitMovimiento = async (movimiento: {
    recibidoPor: string;
    almacenId: number;
    tipoTarimaId: number;
    tipoMovimiento: string;
    cantidad: number;
  }) => {
    try {
      const response = await fetch('/api/movimientos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movimiento),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el movimiento');
      }

      const nuevoMovimiento = await response.json();
      agregarMovimiento(nuevoMovimiento);

      setNotification({ message: 'Movimiento registrado correctamente', type: 'success' });
      handleCloseModal();
    } catch (error) {
      console.error(error);
      setNotification({ message: 'Hubo un error al registrar el movimiento', type: 'error' });
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className={styles.dashboardWrapper}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      <section className="flex space-x-5 mt-[50px]">
        <InfoCard title="Total de tarimas" value={totalTarimas} color={tarimaColors.total} />

        {Object.entries(tarimasPorTipo).map(([tipo, cantidad]) => (
          <InfoCard key={tipo} title={`Total de tarimas de tipo: ${tipo}`} value={cantidad} color={tarimaColors[tipo]}  />
        ))}
      </section>
      <section className="mt-[80px] flex flex-col">
        <button onClick={handleOpenModal} className="ease-in duration-100 w-[150px] self-end bg-[#7888ec] hover:bg-[#5969cd] font-medium text-white text-800 00 mb-4 p-3 rounded-md">
          <p className="text-[.7rem] flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1 mr-1 icon icon-tabler icons-tabler-outline icon-tabler-plus">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
            Añadir registro
          </p>
        </button>
        <AddMovimientosModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitMovimiento}
        />
        <InventoryTable />
      </section>
    </div>
  );
}