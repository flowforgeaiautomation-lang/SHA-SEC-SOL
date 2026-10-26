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

## Application rules
- Keep public MSS pages in TanStack file routes with shared site layout and central multilingual content; this preserves consistent navigation and language rendering.
- Use shared semantic CSS tokens for all public page styling and portal-based accessible menus for navigation; this keeps branding consistent and prevents clipping and keyboard traps.
- Preserve the supplied logo monogram using transparent light/dark asset variants; this maintains artwork identity and contrast across site surfaces.
- Keep enquiry intake server-side with validation, honeypot, durable contact throttling and idempotency; browser roles cannot read or write private enquiry records.
- Use the single deterministic daily coverage engine for planner views; requested coverage is not an approved workforce schedule.
- Record unimplemented enterprise phases and launch blockers in roadmap.md rather than presenting simulated controls as operational.
- Keep private enquiry management under the authenticated layout, with independent server-side admin role checks and user-scoped RLS queries; exports must neutralise spreadsheet formulas to protect staff.
- Keep vite.config.ts on @lovable.dev/vite-tanstack-config; replacing it with raw plugins broke every page (404s).
