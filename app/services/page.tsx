import React from 'react';
import { Metadata } from 'next';
import ServicesClient from './_components/ServicesClient';

export const metadata: Metadata = {
  title: 'Browse Services | FixItNow',
  description: 'Find top-rated professionals for your home services.',
};

// Replace these URLs with your actual backend endpoints
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/categories`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchInitialServices() {
  try {
    // You can also pass initial query params here if needed
    const res = await fetch(`${API_BASE_URL}/api/services`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ServicesPage() {
  // Fetch data in parallel
  const [categoriesData, initialServicesData] = await Promise.all([
    fetchCategories(),
    fetchInitialServices(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <ServicesClient />
    </div>
  );
}