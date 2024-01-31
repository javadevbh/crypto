import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto app</h1>
        <p>React.js project ✨</p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>
          Developed by{" "}
          <a target="_blank" href="https://github.com/javadevbh/">
            Javad
          </a>{" "}
          with ❤️
        </p>
      </footer>
    </>
  );
}

export default Layout;
