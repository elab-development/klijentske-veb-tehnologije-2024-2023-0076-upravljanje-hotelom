import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        e.currentTarget.reset();

        setTimeout(() => {
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="contact-container">
            <h1>Kontaktirajte nas</h1>

            <form className="contact-form" onSubmit={handleSubmit}>
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

            {submitted && (
                <div className="success-message">
                    ✅ Poruka je uspešno poslata!
                </div>
            )}
        </div>
    );
};

export default Contact;