---
name: plan-then-approve
description: Use for every request that would change the Clutch Code site (content, design, code, assets, config). Produces a reviewable plan, waits for approval, executes only the approved scope, then reports and asks for sign-off.
---

# Workflow

## Step 1 — Understand (read-only)
Read the relevant files. List what you looked at. Ask up to 3 clarifying questions ONLY if the answer would change the plan. Otherwise state your assumptions.

## Step 2 — Write the plan (use this exact template)

### Plan: <short title>
**Request (my words):** one or two sentences restating what the user wants.
**Assumptions:** bullets. Mark anything uncertain with "(please confirm)".
**Scope — files to CREATE:** path + one-line purpose.
**Scope — files to EDIT:** path + what changes (section/selector/function names, not "various").
**Scope — files to DELETE/RENAME:** path + reason (or "none").
**Out of scope (I will NOT touch):** bullets. Always include: copy not mentioned, logo, unrelated pages.
**Steps (ordered):** numbered, each small enough to verify.
**Design decisions:** for visual work, the choice made, the alternative considered, and why. Add a text description or ASCII/wireframe sketch of layout changes.
**Risks / things that could break:** bullets (responsive layout, anchors, JS hooks, SEO, accessibility, performance).
**Verification:** exactly how I will check it (pages, widths 1440/820/390, links, Lighthouse, keyboard).
**Rollback:** git checkpoint name and how to revert.
**Effort & size:** rough file count and lines changed.

End with exactly: "Reply APPROVE to proceed, or tell me what to change."
STOP. Make no changes.

## Step 3 — Wait
Do nothing until an approval phrase arrives. If the user edits the plan, reissue the full plan with a "Changes since last version" list at the top.

## Step 4 — Checkpoint, then execute
After approval: create a git checkpoint (`git add -A && git commit -m "checkpoint: before <title>"`, or if git is unavailable, copy touched files to /.backup/<timestamp>/). Execute the steps in order. Tick each step off in the task list. Touch only files listed in Scope.

## Step 5 — Verify and report
Run the verification from the plan. Produce a **Change Report**:
- What changed (file → summary, with diff for non-trivial edits)
- Screenshots before/after for visual changes
- Verification results (pass/fail, with evidence)
- Anything that deviated from the plan and why
- Anything you noticed but did NOT change (suggestions only)
End with: "Reply ACCEPT to keep this, REVISE <notes> to adjust, or REVERT to roll back to the checkpoint."

## Step 6 — Close
ACCEPT → commit with a clear message. REVISE → go back to Step 2 with a small plan for the revision. REVERT → restore the checkpoint and confirm.

# Scope-creep rules
- If you want to fix something outside the plan, list it under "Suggestions" in the report. Do not fix it.
- Batch size: if the plan exceeds ~10 files or ~400 changed lines, split it into phases and request approval per phase.
- Destructive actions (delete, overwrite, mass find-and-replace, dependency installs, network downloads) must each be named explicitly in the plan.
