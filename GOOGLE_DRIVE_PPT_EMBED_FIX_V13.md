# Google Drive / Google Slides Embed Fix V13

The student viewer now handles Google Slides reference material more robustly:

- Google Drive file URL: `/file/d/FILE_ID/view` -> `/file/d/FILE_ID/preview`
- Google Slides shared/edit/view URL: `/presentation/d/FILE_ID/...` -> `/presentation/d/FILE_ID/preview?rm=minimal`
- Published Google Slides URL: `/presentation/d/FILE_ID/pub...` -> `/presentation/d/FILE_ID/pub?embedded=true`
- Published embed URL: `/presentation/d/e/PUBLISHED_ID/embed` -> normalized embed URL

This keeps the source inside the LMS viewer and does not expose an outbound source button.

For Google Slides, if the presentation still shows a Google Docs error, the file's sharing/publishing settings are the limiting factor, not the iframe. Google officially documents `File -> Share -> Publish to web -> Embed` for website embedding.
