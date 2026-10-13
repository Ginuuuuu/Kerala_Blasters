import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { TeamPage } from '@/pages/TeamPage';
import { PlayerPage } from '@/pages/PlayerPage';
import { MatchesPage } from '@/pages/MatchesPage';
import { MatchDetailPage } from '@/pages/MatchDetailPage';
import { NewsPage } from '@/pages/NewsPage';
import { ArticlePage } from '@/pages/ArticlePage';
import { ClubPage } from '@/pages/ClubPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="team/:slug" element={<PlayerPage />} />
        <Route path="matches" element={<MatchesPage />} />
        <Route path="matches/:id" element={<MatchDetailPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:slug" element={<ArticlePage />} />
        <Route path="club" element={<ClubPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
