# Task 06: Make How-to-Use Page Mobile Responsive

**Status**: 📋 Planning | **Priority**: High | **Time**: 2-3 hours

## Objective
Ensure the How-to-Use page is fully responsive and provides optimal UX on mobile devices (320px - 768px).

## Current Issues
- Fixed padding causes overflow on small screens; Code blocks overflow horizontally
- Max-width doesn't adapt to tablets; Text sizes don't scale for mobile

## Implementation Steps
1. Update `how-to-use-page.ts` with responsive padding (`px-4 md:px-5 lg:px-8`)
2. Adjust max-width for tablets (`max-w-full md:max-w-3xl`)
3. Fix code block overflow with `break-words` and responsive font sizes
4. Update header components for mobile-friendly text sizes
5. Test on viewports: 320px, 375px, 768px, 1024px
6. Ensure touch targets meet 44x44px minimum
7. Verify no horizontal scrolling
8. Add responsive margins to documentation wrapper
