import { useEffect, useRef } from 'react';

export function SearchBar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Move Starlight's search button to our container (not clone, but move!)
    const searchButton = document.querySelector('site-search') as HTMLElement;

    if (searchButton && containerRef.current) {
      // Move (not clone) the original element to preserve event listeners
      searchButton.style.width = '100%';
      searchButton.style.maxWidth = '100%';
      searchButton.style.display = 'block';

      containerRef.current.appendChild(searchButton);

      // Style the search button
      const button = searchButton.querySelector('button');
      if (button) {
        // Make it look like a large search input
        button.style.width = '100%';
        button.style.height = '3rem';
        button.style.fontSize = '1rem';
        button.style.borderRadius = '0.5rem';
        button.style.padding = '0.75rem 1rem 0.75rem 2.5rem';
        button.style.textAlign = 'left';
        button.style.justifyContent = 'flex-start';
        button.style.gap = '0.75rem';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.minWidth = '100%';
      }

      // Style the icon
      const svg = searchButton.querySelector('svg');
      if (svg) {
        svg.style.width = '1.25rem';
        svg.style.height = '1.25rem';
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{
        fontSize: '1rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    />
  );
}
