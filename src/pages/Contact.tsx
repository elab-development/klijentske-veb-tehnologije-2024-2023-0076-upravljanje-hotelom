import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      <h1>Kontaktirajte nas</h1>
      <p>Imate pitanje ili želite da rezervišete? Slobodno nas kontaktirajte.</p>

      <form className="contact-form">
        <label>
            Ime:
            <input
            type="text"
            name="name"
            required
            placeholder="Unesite vaše ime"
            />
        </label>
        <label>
            Email:
            <input
            type="email"
            name="email"
            required
            placeholder="Unesite vašu email adresu"
            />
        </label>
        <label>
            Poruka:
            <textarea
            name="message"
            rows={5}
            required
            placeholder="Napišite vašu poruku ovde..."
            ></textarea>
        </label>
        <button type="submit">Pošalji</button>
    </form>


      <div className="contact-info">
        <p><strong>Email:</strong> kontakt@hotel.rs</p>
        <p><strong>Telefon:</strong> +381 11 123 456</p>
        <p><strong>Adresa:</strong> Ulica Hotela 1, Beograd</p>
      </div>
    </div>
  );
};

export default Contact;
