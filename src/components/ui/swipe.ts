// Card groups on phones: one horizontal row the visitor swipes through, each
// card 85% wide so the next one peeks in, snapping to the card. From md up the
// row turns back into a grid; pass the grid columns with mdGrid.
// The row bleeds to the screen edges (-mx-4 / px-4 match the page gutter).
export const swipeRow = (mdGrid: string) =>
  `-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 ${mdGrid}`;

export const swipeItem = "w-[85%] shrink-0 snap-start md:w-auto";
