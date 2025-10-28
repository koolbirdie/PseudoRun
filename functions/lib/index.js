"use strict";
/**
 * Firebase Cloud Functions
 * Admin operations for role management
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserRole = exports.initFirstAdmin = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
/**
 * ONE-TIME INITIALIZATION FUNCTION
 * HTTP function to set the first admin user
 * Protected by a secret key that should be set in Firebase Functions config
 *
 * Usage:
 * 1. Set the secret: firebase functions:config:set init.secret="YOUR_SECRET_KEY"
 * 2. Deploy: firebase deploy --only functions
 * 3. Call: curl -X POST "https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/initFirstAdmin" \
 *          -H "Content-Type: application/json" \
 *          -d '{"userId": "USER_ID", "secret": "YOUR_SECRET_KEY"}'
 * 4. REMOVE this function after first admin is set
 */
exports.initFirstAdmin = functions.https.onRequest(async (req, res) => {
    var _a;
    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    const { userId, secret } = req.body;
    // Get the secret from environment config
    // For development, you can use a hardcoded secret (REMOVE in production)
    const expectedSecret = ((_a = functions.config().init) === null || _a === void 0 ? void 0 : _a.secret) || 'temp-init-secret-12345';
    // Validate secret
    if (secret !== expectedSecret) {
        res.status(403).json({ error: 'Invalid secret' });
        return;
    }
    // Validate userId
    if (!userId || typeof userId !== 'string') {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
    }
    try {
        // Set custom claim for admin role
        await admin.auth().setCustomUserClaims(userId, { role: 'admin' });
        console.log(`✓ First admin set: ${userId}`);
        res.json({
            success: true,
            message: `Admin role set for user ${userId}. User must sign out and sign back in for changes to take effect.`,
            warning: 'IMPORTANT: Remove this function after use for security!'
        });
    }
    catch (error) {
        console.error('Error setting admin role:', error);
        res.status(500).json({ error: 'Failed to set admin role' });
    }
});
/**
 * Callable function to set user role
 * Only callable by users with admin claim
 */
exports.setUserRole = functions.https.onCall(async (data, context) => {
    // Security: Check if caller is admin
    if (!context.auth || context.auth.token.role !== 'admin') {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can set user roles');
    }
    const { userId, role } = data;
    // Validate role
    if (!['regular', 'teacher', 'admin'].includes(role)) {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid role specified');
    }
    // Validate userId
    if (!userId || typeof userId !== 'string') {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid user ID');
    }
    try {
        // Set custom claim
        await admin.auth().setCustomUserClaims(userId, { role });
        return { success: true, message: `Role set to ${role} for user ${userId}` };
    }
    catch (error) {
        console.error('Error setting user role:', error);
        throw new functions.https.HttpsError('internal', 'Failed to set user role');
    }
});
//# sourceMappingURL=index.js.map