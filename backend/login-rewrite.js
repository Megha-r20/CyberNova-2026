/* ───────────────────────────────
   ADMIN LOGIN - SIMPLIFIED v4
─────────────────────────────── */
app.post('/api/admin/login', (req, res) => {
    try {
        console.log('--- LOGIN DEBUG START ---');
        console.log('Headers:', JSON.stringify(req.headers['content-type']));
        console.log('Body:', JSON.stringify(req.body));

        // Handle both { password: "..." } and { "password": "..." }
        let password = req.body.password;

        // Trimming whitespace to be safe
        if (typeof password === 'string') {
            password = password.trim();
        }

        console.log('Received Password:', password);
        console.log('Expected Password:', ADMIN_PASSWORD);

        if (!password) {
            console.log('❌ Result: No password provided');
            return res.status(400).json({ success: false, message: 'Password is required' });
        }

        if (password === ADMIN_PASSWORD) {
            console.log('✅ Result: SUCCESS');
            const token = jwt.sign(
                { admin: true, timestamp: Date.now() },
                JWT_SECRET,
                { expiresIn: '6h' }
            );
            console.log('--- LOGIN DEBUG END ---\n');
            return res.json({ success: true, token });
        } else {
            console.log('❌ Result: FAILED (Mismatch)');
            console.log('--- LOGIN DEBUG END ---\n');
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }
    } catch (error) {
        console.error('SERVER ERROR:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
