import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// ✅ Función GET para obtener los movimientos
export async function GET() {
  try {
    const movimientos = await prisma.movimientostarima.findMany({
      include: { almacen: true, tipotarima: true },
    });

    return NextResponse.json(movimientos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener los movimientos', error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recibidoPor, almacenId, tipoTarimaId, tipoMovimiento, cantidad } = body;

    // Verificar que los datos sean válidos
    if (!recibidoPor || !almacenId || !tipoTarimaId || !cantidad) {
      return NextResponse.json(
        { message: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Obtener los datos relacionados (almacen y tipotarima)
    const almacen = await prisma.almacen.findUnique({ where: { id: almacenId } });
    const tipotarima = await prisma.tipotarima.findUnique({ where: { id: tipoTarimaId } });

    if (!almacen || !tipotarima) {
      return NextResponse.json(
        { message: 'Almacén o tipo de tarima no encontrado' },
        { status: 404 }
      );
    }

    // Crear el movimiento
    const movimiento = await prisma.movimientostarima.create({
      data: {
        recibidoPor,
        almacenId,
        tipoTarimaId,
        tipoMovimiento,
        cantidad,
      },
      include: { almacen: true, tipotarima: true }, // Incluir los datos relacionados
    });

    return NextResponse.json(movimiento, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al registrar el movimiento', error },
      { status: 500 }
    );
  }
}
