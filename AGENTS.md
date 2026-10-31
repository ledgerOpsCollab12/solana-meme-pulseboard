<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the reference-based product preview in a separate browser-safe component, with its rotation interval and stage progression in a tested helper, so presentation stays independent of live market data.
- Keep the recorded hero video in a separate browser-safe component with WebM first and MP4 fallback, so playback remains compatible without coupling it to live market data.
- Keep the illustrative signal network in a browser-safe canvas component with semantic-token colors, deterministic paths, visibility-aware animation and reduced-motion support; it must remain independent of real wallet activity.
- Keep the scroll-led intro, staged same-viewport product reveal and single CTA that settles into the product scene in a browser-safe component with a tested progression helper, animation-frame updates and a non-sticky reduced-motion layout, so the reveal remains accessible without duplicated controls.
- Keep the scroll-led problem billboards in a browser-safe component with tested stage selection and a static reduced-motion layout, so each problem remains readable independently of live market data.
- Pre-optimize the preview's UI dependencies alongside the template's React dependencies to avoid late dependency discovery mixing React module instances in an already-open preview.
- Landing request forms share a browser-safe Zod schema and a public server function that only inserts into private, service-role-only tables; visitors must never read submissions.
