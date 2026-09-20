// Add individual Reel links here to replace the visual cards with native Instagram embeds.
// Example: 'https://www.instagram.com/reel/ABC123/'
const viralReels = [
  'https://www.instagram.com/reel/DdNyoFDI2Cg/',
  'https://www.instagram.com/reel/DZcKoTtplhB/',
  'https://www.instagram.com/reel/DaKblAehtk_/',
  'https://www.instagram.com/reel/DZz2UKIuCYQ/'
];

const collaborationReels = [
  'https://www.instagram.com/reel/DdJrJ69uBFQ/',
  'https://www.instagram.com/reel/Dcdo0-5w5jo/',
  'https://www.instagram.com/reel/DbkB9oaR8Xd/',
  'https://www.instagram.com/reel/DZ2B3qoh_7D/',
  'https://www.instagram.com/reel/DbpwYjgPQtt/'
];

// Paste the complete Tally share/embed URL here, e.g. 'https://tally.so/r/abcd12'.
// Until a Tally form ID is supplied, the polished on-page inquiry form is shown instead.
const tallyFormUrl = 'https://tally.so/embed/obJxeM?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';

const formatNumber = (value, node) => {
  const decimals = Number(node.dataset.decimals || 0);
  return `${value.toFixed(decimals)}${node.dataset.suffix || ''}`;
};

const countUp = (node) => {
  const target = Number(node.dataset.target);
  const duration = 1250;
  const begin = performance.now();
  const step = (now) => {
    const progress = Math.min((now - begin) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    node.textContent = formatNumber(value, node);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { countUp(entry.target); obs.unobserve(entry.target); }
  });
}, { threshold: 0.55 });
document.querySelectorAll('[data-count]').forEach((stat) => observer.observe(stat));

const renderReels = (gridId, reels) => {
  const grid = document.querySelector(gridId);
  if (!grid || !reels.length) return;
  grid.classList.add('embedded-reels');
  grid.innerHTML = reels.map((url) => `<div class="instagram-frame-wrap"><a class="reel-fallback" href="${url}" target="_blank" rel="noreferrer">Having trouble viewing? Open this Reel on Instagram ↗</a><iframe class="instagram-frame" src="${url}embed/" title="Softly Homely Instagram Reel" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" scrolling="no"></iframe></div>`).join('');
};

renderReels('#reel-grid', viralReels);
renderReels('#collaboration-reel-grid', collaborationReels);

if (tallyFormUrl) {
  const target = document.querySelector('#tally-embed');
  target.innerHTML = `<iframe src="${tallyFormUrl}" loading="lazy" title="Softly Homely collaboration inquiry" width="100%" height="900" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe>`;
}
