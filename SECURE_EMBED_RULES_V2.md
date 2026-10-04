# Strict Embedded Resource Policy

Student lesson/lab resources follow this rule:

`What You’ll Learn → Video → PPT/PDF → Custom Material → Lab → Test → Assignment`

For resource URLs inside the learning experience:
- YouTube is embedded with the no-cookie embed player.
- Google Drive PPT/PDF/Slides are embedded with the Drive/Slides preview/embed view.
- GitHub file links are fetched server-side from the allowed GitHub raw endpoint and rendered as read-only code on the Academy domain; the GitHub source URL is never rendered as an outbound student link.
- Dataset/resource URLs are embedded in the page rather than shown as source links.
- Google Colab is the only intentional outbound-link exception.
- Embedded iframes are sandboxed without `allow-popups` or `allow-top-navigation`.

This prevents ordinary source-navigation UI in the LMS. It is not DRM: users with browser developer tools can technically inspect resources that a browser must load from a public third-party service. Absolute concealment would require proxying/re-hosting every external asset.
