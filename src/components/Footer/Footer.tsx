import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} RentalCar. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Yurii Anhelov</p>
          <p>
            Contact us:{' '}
            <a href="mailto:student@notehub.app">student@....app</a>
          </p>
        </div>
      </div>
    </footer>
  );
}