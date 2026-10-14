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
- Keep enquiry intake server-side with validation, honeypot, durable contact throttling and idempotency; browser roles cannot read or write private enquiry records.
- Use the single deterministic daily coverage engine for planner views; requested coverage is not an approved workforce schedule.
- Record unimplemented enterprise phases and launch blockers in roadmap.md rather than presenting simulated controls as operational.
