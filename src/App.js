import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Content from './components/Content';
import styles from './styles/modules/app.module.scss';

function App() {
  return (
    <>
      <div className="container">
        <p className={styles.title}>Grocery App</p>
        <div className={styles.app_wrapper}>
          <Header />
          <Content />
        </div>
      </div>
      {/* Toaster for displaying notifications */}
      <Toaster
        className={styles.toaster}
        position="bottom-center"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  );
}

export default App;
