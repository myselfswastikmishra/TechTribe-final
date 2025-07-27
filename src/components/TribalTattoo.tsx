export function TribalTattoo() {
  return (
    <div className="font-headline text-foreground hover:text-primary transition-colors">
      <svg
        viewBox="0 0 200 50"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto"
        style={{ fill: "currentColor" }}
      >
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Uncial+Antiqua&display=swap');
            .logo-text { font-family: 'Uncial Antiqua', system-ui; font-size: 16px; font-weight: bold; }
            .est-text { font-family: 'Uncial Antiqua', system-ui; font-size: 6px; }
          `}
        </style>
        
        {/* Top tattoo */}
        <path d="M10 15 C 20 5, 30 5, 40 15 S 50 25, 60 15 S 70 5, 80 15 S 90 25, 100 15 S 110 5, 120 15 S 130 25, 140 15 S 150 5, 160 15 S 170 25, 180 15 S 190 5, 190 15" stroke="hsl(var(--primary))" fill="none" strokeWidth="1"/>
        <path d="M15 13 C 25 3, 35 3, 45 13 S 55 23, 65 13 S 75 3, 85 13 S 95 23, 105 13 S 115 3, 125 13 S 135 23, 145 13 S 155 3, 165 13 S 175 23, 185 13" stroke="hsl(var(--primary))" fill="none" strokeWidth="0.5"/>
        
        {/* Text */}
        <text x="100" y="30" textAnchor="middle" className="logo-text">
          TECH TRIBE
        </text>
        <text x="100" y="38" textAnchor="middle" className="est-text">
          EST. 2024
        </text>
        
        {/* Bottom tattoo */}
        <path d="M10 40 C 20 50, 30 50, 40 40 S 50 30, 60 40 S 70 50, 80 40 S 90 30, 100 40 S 110 50, 120 40 S 130 30, 140 40 S 150 50, 160 40 S 170 30, 180 40 S 190 50, 190 40" stroke="hsl(var(--primary))" fill="none" strokeWidth="1"/>
        <path d="M15 42 C 25 52, 35 52, 45 42 S 55 32, 65 42 S 75 52, 85 42 S 95 32, 105 42 S 115 52, 125 42 S 135 32, 145 42 S 155 52, 165 42 S 175 32, 185 42" stroke="hsl(var(--primary))" fill="none" strokeWidth="0.5"/>
      </svg>
    </div>
  );
}
