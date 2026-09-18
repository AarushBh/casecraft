# Intro soundtrack

The HTML loading screen appears before application code loads. It clears after React mounts the application; there is no simulated percentage or mandatory delay. A failed startup exposes a reload link. Direct privacy and terms links bypass the intro.

The intro loads Spotify's official iframe API automatically and calls `play()` on the player's ready event. Browsers and Spotify may block audible autoplay. The visible, unmodified Spotify controls remain available. Music availability and preview length are controlled by Spotify, not Casecraft. No audio files or preview URLs are copied or hosted.

`app/music/tracks.ts` contains 13 specific recording IDs. Each was checked against its individual Spotify embed's `isExplicit` value. The verification record is in `music-recordings.json`. This is provider metadata verification, not a guarantee that a song has no mature themes. Do not substitute an artist feed, an explicit album edition, a cover or a third-party upload.

Normal tracks share the regular selection pool. The original cast recording of “Fukashigi no Karte” has a 1% random selection probability, unless it is the current track (immediate repeats are excluded). Users may also choose it directly. Shuffle never immediately repeats the current recording.

Music off is saved in local storage. Turning it off removes the player. Entering or dismissing the intro also destroys the player, including any pending asynchronous initialization. Reopening mounts one fresh player. Each full page load shows the intro; navigation within the app does not.

Sources:
- https://developer.spotify.com/documentation/embeds/references/iframe-api
- https://developer.spotify.com/documentation/embeds/tutorials/creating-an-embed
- Individual recording metadata URLs in `music-recordings.json` (verified September 17, 2026).
