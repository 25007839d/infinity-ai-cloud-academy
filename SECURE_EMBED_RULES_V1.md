# Secure Embedded Learning Resources

Student-facing external course resources follow these rules:

- YouTube/Drive/PDF/Slides are rendered inside sandboxed iframes.
- No non-Colab resource gets an Open/View/Visit Source link in the LMS.
- GitHub file links are fetched as raw read-only text and displayed without a GitHub navigation control.
- Dataset URLs are embedded rather than exposed as anchors.
- Google Colab is the one intentional exception: students can open it externally.
- Sandbox does not grant `allow-popups` or `allow-top-navigation`, reducing source-site navigation from embedded documents.

This is UI/navigation hardening, not DRM. A user with browser developer tools/network access can technically inspect public resources used by a browser. Absolute prevention is not possible for public web embeds without proxying/re-hosting the content.
