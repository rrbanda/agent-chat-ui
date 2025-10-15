import { NextResponse } from 'next/server';
import { getClientConfig } from '@/lib/config-loader';

export async function GET() {
  try {
    const config = getClientConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error loading config:', error);
    return NextResponse.json(
      { error: 'Failed to load configuration' },
      { status: 500 }
    );
  }
}

