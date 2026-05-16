import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#ffdf00' }}>
      <h1>Makena's List of Not Gross Recipes</h1>
      <nav>
        <Link href="/">All Recipes</Link> | <Link href="/add">Add Recipe</Link> 
      </nav>
    </header>
  );
}