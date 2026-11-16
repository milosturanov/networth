import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 text-accent2 w-screen h-screen items-center justify-center">
      <h1 className="text-3xl ">LANDING PAGE</h1>
      <Link href="/dashboard" className="text-xl underline">
        Link to Login Page
      </Link>
    </div>
  );
}
