import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/404',
    '/api/webhook',
    'question/:id',
    '/tags',
    '/tags/:id',
    '/profile/:id',
    '/community',
    '/jobs',
  ],

  ignoredRoutes: ['/api/webhook', '/api/chatgpt'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
