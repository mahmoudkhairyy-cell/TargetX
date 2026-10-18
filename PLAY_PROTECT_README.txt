TargetX — Google Play Protect troubleshooting

What was changed
- Removed autoVerify from the custom-scheme OAuth intent filter in app.config.ts.
  Android App Link verification is designed for HTTPS links with domain association;
  this app uses a private custom URI scheme for its OAuth callback.
- No app features, app identifier, OAuth scheme, permissions, or application data were intentionally changed.

Important limitation
This is a configuration cleanup, not a guaranteed fix for a Play Protect malware block.
The uploaded archive did not contain an APK/AAB, so the exact blocked binary and its signature could not be examined.

Recommended path
1. Build a clean RELEASE build from this source using a trusted, up-to-date Expo/EAS build environment.
2. Keep the same package ID and the same release signing key for updates. Do not distribute a debug APK.
3. Prefer an Android App Bundle (.aab) uploaded to Google Play Console internal testing; let Play scan it.
4. If Play Protect still blocks the exact build, record the exact warning text and submit the app/file for Google Play Protect review/appeal. Do not disable Play Protect or advise users to bypass the block.
5. Before public release, audit dependencies, environment secrets, and server endpoints; never bundle Gemini/API secrets in the mobile app.
