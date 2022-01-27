// pages/server-sitemap.xml/index.tsx

import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getServerSideSitemap } from 'next-sitemap';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];

  const githubRepos = await prisma.repository.findMany({
    where: {
      blockedAt: null,
      platform: 'GitHub',
    },
    select: {
      name: true,
      Owner: { select: { login: true } },
    },
  });

  for (const repo of githubRepos) {
    fields.push({
      loc: `https://matnbaz.net/github/${repo.Owner.login}/${repo.name}`,
      lastmod: new Date().toISOString(),
    });
  }

  const githubOwners = await prisma.owner.findMany({
    where: {
      blockedAt: null,
      platform: 'GitHub',
    },
    select: {
      login: true,
    },
  });

  for (const owner of githubOwners) {
    fields.push({
      loc: `https://matnbaz.net/github/${owner.login}`,
      lastmod: new Date().toISOString(),
    });
  }

  const collections = await prisma.collection.findMany({
    select: { slug: true },
  });

  for (const collection of collections) {
    fields.push({
      loc: `https://matnbaz.net/collections/${collection.slug}`,
      lastmod: new Date().toISOString(),
    });
  }

  const posts = await prisma.post.findMany({
    where: { publishedAt: { not: null } },
    select: { slug: true },
  });

  for (const post of posts) {
    fields.push({
      loc: `https://matnbaz.net/blog/${post.slug}`,
      lastmod: new Date().toISOString(),
    });
  }

  return getServerSideSitemap(ctx, fields);
};

const exported = () => {
  // Default export to prevent next.js errors
};
export default exported;
