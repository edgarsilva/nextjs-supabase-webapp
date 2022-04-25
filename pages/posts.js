import { useState, useEffect } from 'react'

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

import supabase from '../lib/supabase'

export async function getStaticProps(context) {
  const { data, error } = await supabase.from('posts').select('*');

  return {
    props: {
      posts: data
    }, // will be passed to the page component as props
  };
}

export default function Posts({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>A list of posts</title>
        <meta name="description" content="We are getting this from supabase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} style={{ padding: '50px 0 100px 0' }}>
        <h1 className="header">Posts: Supabase + Next.js</h1>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};