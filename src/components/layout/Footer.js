const Footer = () => (
  <footer className="border-t border-stream-border bg-stream-surface/50 py-10 px-[4%] md:px-[5%]">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-sm text-stream-muted">
      <div>
        <p className="font-display text-2xl text-stream-accent tracking-wider mb-2">
          MOVIEMENTUM
        </p>
        <p>Discover movies. Stream-inspired experience.</p>
      </div>
      <div className="flex gap-8">
        <div>
          <p className="text-white font-medium mb-2">Browse</p>
          <ul className="space-y-1">
            <li>Action</li>
            <li>Drama</li>
            <li>Sci-Fi</li>
          </ul>
        </div>
        <div>
          <p className="text-white font-medium mb-2">Data</p>
          <p>Powered by Cinemeta</p>
        </div>
      </div>
    </div>
    <p className="text-center text-xs text-stream-muted/60 mt-8">
      © {new Date().getFullYear()} MovieMentum — For demo purposes only
    </p>
  </footer>
);

export default Footer;
