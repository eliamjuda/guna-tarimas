'use client';

import { useMovimientos } from "@/context/MovimientosContext";


export default function MovimientosTable() {
  const { movimientos } = useMovimientos();


  const movimientosOrdenados = [...movimientos].sort((a, b) => {
    return new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime();
  });

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Movimientos</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-[#7888ec] text-white ">
            <th className="p-2">Fecha</th>
            <th className="p-2">Almacén</th>
            <th className="p-2">Recibido por</th>
            <th className="p-2">Tipo de tarima</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {movimientosOrdenados.map((mov) => (
            <tr key={mov.id} className="text-center border">
              <td className="border p-2">{new Date(mov.fechaHora).toLocaleString()}</td>
              <td className="border p-2">{mov.almacen.nombre}</td>
              <td className="border p-2">{mov.recibidoPor}</td>
              <td className="border p-2">{mov.tipotarima.nombre}</td>
              <td className={`border p-2 ${mov.tipoMovimiento === 'entrada' ? 'text-[#0ebd35]' : 'text-[#d82c14]'}`}>
                {mov.tipoMovimiento === 'entrada' ? (
                  <>
                    Entrada
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 inline-block align-text-bottom"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 5l0 12" />
                      <path d="M18 12l-6 6" />
                      <path d="M6 11l6 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    Salida
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 inline-block align-text-bottom"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 5l0 14" />
                      <path d="M18 11l-6 -6" />
                      <path d="M6 11l6 -6" />
                    </svg>
                  </>
                )}
              </td>
              <td className="border p-2">{mov.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}