'use client';

import React, { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import styles from './RentalForm.module.css';

interface RentalFormProps {
  carId: string;
}

const RentalForm: React.FC<RentalFormProps> = ({ carId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [comment, setComment] = useState('');

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    birthday: false,
    comment: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isBirthdayValid = birthday.trim().length > 0;

  const showNameError = (touched.name || isSubmitted) && !isNameValid;
  const showEmailError = (touched.email || isSubmitted) && !isEmailValid;
  const showBirthdayError = (touched.birthday || isSubmitted) && !isBirthdayValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (isNameValid && isEmailValid && isBirthdayValid) {
      console.log('Form submitted successfully for car:', carId, { name, email, birthday, comment });
      alert('Thanks for your booking!');
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>Book your car now</h3>
        <p className={styles.formSubtitle}>Stay connected! We are always ready to help you.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={`${styles.fieldWrapper} ${showNameError ? styles.hasError : ''}`}>
          <label className={styles.label}>Name*</label>
          <div className={`${styles.inputContainer} ${showNameError ? styles.error : ''}`}>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              className={styles.input} 
            />
            {showNameError && <FiAlertCircle className={styles.errorIcon} size={20} />}
          </div>
          {showNameError && <span className={styles.errorText}>Please enter your name.</span>}
        </div>

        <div className={`${styles.fieldWrapper} ${showEmailError ? styles.hasError : ''}`}>
          <label className={styles.label}>Email*</label>
          <div className={`${styles.inputContainer} ${showEmailError ? styles.error : ''}`}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              className={styles.input} 
            />
            {showEmailError && <FiAlertCircle className={styles.errorIcon} size={20} />}
          </div>
          {showEmailError && <span className={styles.errorText}>Please enter your email.</span>}
        </div>

        <div className={`${styles.fieldWrapper} ${showBirthdayError ? styles.hasError : ''}`}>
          <label className={styles.label}>Birthday*</label>
          <div className={`${styles.inputContainer} ${showBirthdayError ? styles.error : ''}`}>
            <input 
              type="text" 
              placeholder="DD.MM.YYYY" 
              value={birthday}
              onFocus={(e) => (e.target.type = 'date')} 
              onBlur={(e) => {
                if (!e.target.value) e.target.type = 'text';
                setTouched((prev) => ({ ...prev, birthday: true }));
              }}
              onChange={(e) => setBirthday(e.target.value)}
              className={styles.input} 
            />
            {showBirthdayError && <FiAlertCircle className={styles.errorIcon} size={20} />}
          </div>
          {showBirthdayError && <span className={styles.errorText}>Birthday is required.</span>}
        </div>

        <div className={styles.fieldWrapper}>
          <label className={styles.label}>Comment</label>
          <div className={styles.inputContainer}>
            <textarea 
              placeholder="Type your comment" 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.textarea} 
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Send
        </button>
      </form>
    </div>
  );
};

export default RentalForm;