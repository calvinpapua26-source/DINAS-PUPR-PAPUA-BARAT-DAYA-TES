
import React from 'react';
import { NewsItem, ProjectItem, InfraStats } from './types';

export const COLORS = {
  primary: '#1e3a8a', // Deep Blue
  secondary: '#eab308', // PUPR Yellow
  accent: '#3b82f6', // Bright Blue
};

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Pembangunan Jalan Trans Papua Barat Daya Dipercepat',
    category: 'Infrastruktur Jalan',
    date: '24 Mei 2024',
    summary: 'Dinas PUPR memastikan percepatan pembangunan akses jalan di wilayah pedalaman Sorong Selatan.',
    imageUrl: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: '2',
    title: 'Penataan Ruang Kawasan Ekonomi Khusus Sorong',
    category: 'Tata Ruang',
    date: '20 Mei 2024',
    summary: 'Rapat koordinasi membahas rencana detail tata ruang untuk mendukung investasi di KEK Sorong.',
    imageUrl: 'https://picsum.photos/800/600?random=2'
  },
  {
    id: '3',
    title: 'PUPR Sosialisasi Sertifikat Laik Fungsi Bangunan',
    category: 'Gedung',
    date: '18 Mei 2024',
    summary: 'Guna menjamin keamanan gedung, PUPR mewajibkan setiap bangunan publik memiliki SLF.',
    imageUrl: 'https://picsum.photos/800/600?random=3'
  }
];

export const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    name: 'Jembatan Sungai Warsamson',
    location: 'Sorong',
    status: 'In Progress',
    progress: 75,
    type: 'Bridge',
    imageUrl: 'https://picsum.photos/600/400?random=11'
  },
  {
    id: 'p2',
    name: 'Reservoir Air Bersih Teminabuan',
    location: 'Sorong Selatan',
    status: 'Completed',
    progress: 100,
    type: 'Water',
    imageUrl: 'https://picsum.photos/600/400?random=12'
  },
  {
    id: 'p3',
    name: 'Pusat Pemerintahan Provinsi',
    location: 'Ayamaru',
    status: 'Planning',
    progress: 10,
    type: 'Building',
    imageUrl: 'https://picsum.photos/600/400?random=13'
  },
  {
    id: 'p4',
    name: 'Peningkatan Jalan Lingkar Maybrat',
    location: 'Maybrat',
    status: 'In Progress',
    progress: 45,
    type: 'Road',
    imageUrl: 'https://picsum.photos/600/400?random=14'
  }
];

export const INFRA_STATS: InfraStats[] = [
  { name: 'Jalan Mantap', value: 65 },
  { name: 'Jembatan Aman', value: 82 },
  { name: 'Akses Air Bersih', value: 58 },
  { name: 'Irigasi Efektif', value: 40 },
];
