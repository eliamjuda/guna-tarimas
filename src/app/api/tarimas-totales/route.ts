import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    // Consulta para calcular el total de tarimas disponibles
    const movimientos = await prisma.movimientosTarima.findMany();

    // Calcular el total de tarimas disponibles
    let totalTarimas = 0;
    movimientos.forEach((movimiento) => {
      if (movimiento.tipoMovimiento === 'entrada') {
        totalTarimas += movimiento.cantidad;
      } else if (movimiento.tipoMovimiento === 'salida') {
        totalTarimas -= movimiento.cantidad;
      }
    });

    return NextResponse.json({ totalTarimas });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener el total de tarimas', error },
      { status: 500 }
    );
  }
}